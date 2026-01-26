import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Whisk - AI Recipe Planner",
  description: "",
};

export default function RootLayout({ children }) {
  return (
        <ClerkProvider   appearance={{
    baseTheme: neobrutalism,
  }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="py-8 px-4 border-t">
          <div className="max-w-6xl flex items-center justify-center mx-auto ">
            <p className="text-stone-600 text-sm">Made by Shahil Kataria</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
