import { auth, currentUser } from "@clerk/nextjs/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const checkUser = async () => {


    const user = await currentUser();
    const {has} = await auth();
    console.log("Clerk User", user);

    if (!user) {
        console.log("No user found");
        return null;
    }
    if(!STRAPI_API_TOKEN){
        console.log("No API token found");
        return null;
    }


// Todo : Pricing Logic
    const subscriptionTier = has({plan : "pro"}) ? "pro" : "free";

    try{
        const existingUserResponse = await fetch(`${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,{
            headers: {
                    "Content-Type": "application/json" ,
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
            cache : "no-store"
        });

        if(!existingUserResponse.ok){
            const errorText = await existingUserResponse.text();
            console.log("Strapi Error Response ", errorText);
            return null;
        }

        const existingUserData = await  existingUserResponse.json();
        if(existingUserData.length > 0){
            const existingUser = existingUserData[0];
            if(existingUser.subscriptionTier !== subscriptionTier){
                await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`,{
                    method : "PUT",
                    headers : {
                                  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                                  contentType : "application/json"
                    },
                    body : JSON.stringify({
                        subscriptionTier
                    })
                })
                
            }

            return {...existingUser ,subscriptionTier}
        }
        // if there is no existing user, then we have to create a new user  in strapi

        // Get Authenticated Role
        const rolesResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`,{
            headers : {
                Authorization : `Bearer ${STRAPI_API_TOKEN}`
            }
        }
    )
     const rolesData = await rolesResponse.json();
     console.log("Roles Data", rolesData);

     const authenticatedRole = rolesData?.roles?.find((role) => role.type === "authenticated");

     if(!authenticatedRole){
        console.log("❌ Authenticated role not found");
        return null;
     }

    //  Create a new user  in strapi

    const userData = {
        username : user.username || user.emailAddresses[0].emailAddress.split("@")[0],
        email : user.emailAddresses[0].emailAddress,
        confirmed :true,
        password : `clerk_managed_${user.id}_${Date.now()}`,
        blocked:false,
        clerkId : user.id,
        firstName : user.firstName || "",
        lastName : user.lastName || "",
        role : authenticatedRole.id,
        image : user.imageUrl || "",
        subscriptionTier
        }

        console.log("User Data", userData); 

    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${STRAPI_API_TOKEN}`,
           
        },
        body : JSON.stringify(userData)
    })
    

    console.log("New User Response", newUserResponse);
    if(!newUserResponse.ok){
        const errorText = await newUserResponse.text();
        console.log("Error Creating User ", errorText);
        return null;
    }


    const newUser = await newUserResponse.json();
    return newUser;
    }catch(error){
        console.log("Error checking user");
        console.error("Error checking user", error);
        return null;
    }    
}