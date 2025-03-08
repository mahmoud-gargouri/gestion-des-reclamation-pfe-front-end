"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import type { Permission } from "@/lib/authorization";

interface PermissionGateProps {
  children: ReactNode;
  permissions?: Permission[];
  anyPermission?: boolean;
  fallback?: ReactNode;
}

export function PermissionGate({
  children,
  permissions = [],
  anyPermission = false,
  fallback = null,
}: PermissionGateProps) {
  const { hasAllPermissions, hasAnyPermission } = useAuth();

  // Si aucune permission n'est spécifiée, on affiche le contenu
  if (permissions.length === 0) {
    return <>{children}</>;
  }

  // Vérifier les permissions
  const hasAccess = anyPermission
    ? hasAnyPermission(permissions)
    : hasAllPermissions(permissions);

  // Afficher le contenu ou le fallback
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
