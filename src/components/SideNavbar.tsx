/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {/* Render the button unconditionally and hide/show it using CSS */}
      <Button
        className={`absolute right-[-20px] top-7 rounded-full p-2 transition-transform duration-300 ${
          isCollapsed ? "rotate-180" : ""
        } md:block hidden`}
        onClick={toggleSidebar}
        variant="secondary"
      >
        <ChevronRight />
      </Button>
      
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Omra",
            href: "/Omra",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Hotel",
            href: "/Hotel",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Circuit",
            href: "/Circuit",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Croisiére",
            href: "/Croisiere",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Soirée et gala",
            href: "/gala",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Pays",
            href: "/Pays",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Voyage",
            href: "/Voyage",
            icon: Plus,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Plus,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
