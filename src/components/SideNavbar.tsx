/** @format */
"use client";

import { useContext, useState } from "react";
import { Nav } from "./ui/nav";
import { UserContext } from "../contexte/usercontexte";
import {
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  Plus,
  LucideIcon,
} from "lucide-react";
import { Button } from "./ui/button";

interface Link {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeProfile } = useContext(UserContext);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const linkadmin: Link[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Assistant",
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
      title: "Visa",
      href: "/Visa",
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
  ];

  const linkasistant: Link[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Omra",
      href: "/Omra",
      icon: Plus,
      variant: "ghost",
    },
    {
      title: "Visa",
      href: "/Visa",
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
  ];

  // Vérifiez si activeProfile est null ou indéfini
  const links = activeProfile?.role === "admin" ? linkadmin : linkasistant;

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <Button
        className={`absolute right-[-20px] top-7 rounded-full p-2 transition-transform duration-300 ${
          isCollapsed ? "rotate-180" : ""
        } md:block hidden`}
        onClick={toggleSidebar}
        variant="secondary"
      >
        <ChevronRight />
      </Button>

      <Nav isCollapsed={isCollapsed} links={links} />
    </div>
  );
}
