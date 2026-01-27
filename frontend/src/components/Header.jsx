import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { Cookie, Refrigerator } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { checkUser } from "../lib/checkUser.js";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto flex items-center justify-between px-4 h-20">
        <Link href={user ? "/dashboard" : "/"}>
          <Image
            src={"/whiskLogo.png"}
            width={100}
            height={100}
            className="w-24"
          />
        </Link>
        {/* lINKS */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600 ">
          <Link
            href="/recipes"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/recipes"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" className="px-6 rounded-full">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserDropdown />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
