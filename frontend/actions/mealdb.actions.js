"use server"



const BASE_API = "https://www.themealdb.com/api/json/v1/1";

export async function getRecipeOfTheDay(){

    try {

        const response = await fetch(`${BASE_API}/random.php`,{
            next : {
                revalidate : 86400 // 24 hours
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch recipe of the day")
        }

        const data = await response.json()
        console.log(data)

        return {
            success : true,
            recipe : data.meals[0]
        }

    }catch(error){
        console.log("Error fetching recipe of the day:", error)
        throw new Error(error.message || "Failed to fetch recipe of the day")
    }

}


export async function getCategories(){
     try {

        const response = await fetch(`${BASE_API}/list.php?c=list`,{
            next : {
                revalidate : 604800 // 1 week
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch categories")
        }

        const data = await response.json()
        console.log(data)

        return {
            success : true,
            categories : data.meals
        }

    }catch(error){
        console.log("Error fetching categories:", error)
        throw new Error(error.message || "Failed to fetch categories")
    }

}


export async function getAreas(){
        try {

        const response = await fetch(`${BASE_API}/list.php?a=list`,{
            next : {
                revalidate : 604800 // 1 week
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch areas")
        }

        const data = await response.json()
        console.log(data)

        return {
            success : true,
            areas : data.meals
        }

    }catch(error){
        console.log("Error fetching areas:", error)
        throw new Error(error.message || "Failed to fetch areas")
    }

}


export async function getMealsByCategory(category){

       try {

        const response = await fetch(`${BASE_API}/filter.php?c=${category}`,{
            next : {
                revalidate : 86400 // 24 hours
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch meals by category")
        }

        const data = await response.json()
        console.log(data)

        return {
            success : true,
            meals : data.meals || [],
            category
        }

    }catch(error){
        console.log("Error fetching areas:", error)
        throw new Error(error.message || "Failed to fetch areas")
    }
    
}


export async function getMealsByArea(area){

       try {

        const response = await fetch(`${BASE_API}/filter.php?a=${area}`,{
            next : {
                revalidate : 86400 // 24 hours
            }
        })

        if(!response.ok){
            throw new Error("Failed to fetch meals by area")
        }

        const data = await response.json()
        console.log(data)

        return {
            success : true,
            meals : data.meals || [],
            area
        }

    }catch(error){
        console.log("Error fetching meals by area:", error)
        throw new Error(error.message || "Failed to fetch meals by area")
    }

}