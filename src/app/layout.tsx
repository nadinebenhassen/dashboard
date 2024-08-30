/** @format */
"use client";


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { UserContextProvider } from "@/contexte/usercontexte";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) { const pathname = usePathname();
  
  // Define a list of paths where the sidebar should NOT be shown
  const pagesWithSidebar = ["/Home"]; // Ajouter d'autres pages si nécessaire

  // Check if the current route is not in the list of pages without a sidebar
  const showSidebar = pagesWithSidebar.includes(pathname);
  return (
    <UserContextProvider>
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        {/* sidebar */}
        {}
        {showSidebar && <SideNavbar />}
        {/* main page */}
        <div className="p-8 w-full">{children}</div>
      </body>
    </html>
    </UserContextProvider>
  );
}
