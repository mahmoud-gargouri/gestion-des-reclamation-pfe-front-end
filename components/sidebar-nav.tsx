"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Users,
  Package,
  History,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import type { Permission } from "@/lib/authorization";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  permission: Permission;
};

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    permission: "dashboard:view",
  },
  {
    title: "Réclamations",
    href: "/reclamations",
    icon: FileText,
    permission: "reclamations:view",
  },
  {
    title: "Utilisateurs",
    href: "/utilisateurs",
    icon: Users,
    permission: "utilisateurs:view",
  },
  {
    title: "Inventaire",
    href: "/inventaire",
    icon: Package,
    permission: "inventaire:view",
  },
  {
    title: "Gestion Matériel",
    href: "/gestion-materiel",
    icon: Settings,
    permission: "materiel:view",
  },
  {
    title: "Historique Réclamations",
    href: "/historique-reclamations",
    icon: History,
    permission: "historique:view",
  },
  {
    title: "Rapports",
    href: "/rapports",
    icon: BarChart3,
    permission: "rapports:view",
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    permission: "notifications:view",
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { hasPermission } = useAuth();

  // Filtrer les éléments de navigation en fonction des permissions de l'utilisateur
  const authorizedItems = items.filter((item) =>
    hasPermission(item.permission)
  );

  return (
    <nav className="grid gap-1 p-2">
      {authorizedItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "transparent"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
