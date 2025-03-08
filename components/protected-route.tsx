"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import type { Permission } from "@/lib/authorization";

interface ProtectedRouteProps {
  children: ReactNode;
  permissions?: Permission[];
  anyPermission?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  permissions = [],
  anyPermission = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, isLoading, hasAllPermissions, hasAnyPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Si des permissions sont spécifiées, vérifier si l'utilisateur les a
    if (permissions.length > 0) {
      const hasAccess = anyPermission
        ? hasAnyPermission(permissions)
        : hasAllPermissions(permissions);

      if (!hasAccess) {
        // Rediriger vers une page d'accès refusé ou la page d'accueil
        router.push("/access-denied");
      }
    }
  }, [
    user,
    isLoading,
    router,
    permissions,
    anyPermission,
    hasAllPermissions,
    hasAnyPermission,
    redirectTo,
  ]);

  // Afficher un état de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Chargement...
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher (la redirection se fera via useEffect)
  if (!user) {
    return null;
  }

  // Si des permissions sont spécifiées, vérifier si l'utilisateur les a
  if (permissions.length > 0) {
    const hasAccess = anyPermission
      ? hasAnyPermission(permissions)
      : hasAllPermissions(permissions);

    if (!hasAccess) {
      return null;
    }
  }

  // Sinon, afficher le contenu protégé
  return <>{children}</>;
}
