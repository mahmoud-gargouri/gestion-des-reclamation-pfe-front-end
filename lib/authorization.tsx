// Types d'utilisateurs
export type UserRole =
  | "enseignant"
  | "etudiant"
  | "technicien"
  | "administrateur";

// Définition des permissions
export type Permission =
  | "dashboard:view"
  | "reclamations:view"
  | "reclamations:create"
  | "reclamations:edit"
  | "reclamations:delete"
  | "reclamations:assign"
  | "utilisateurs:view"
  | "utilisateurs:create"
  | "utilisateurs:edit"
  | "utilisateurs:delete"
  | "inventaire:view"
  | "inventaire:create"
  | "inventaire:edit"
  | "inventaire:delete"
  | "materiel:view"
  | "materiel:create"
  | "materiel:edit"
  | "materiel:delete"
  | "rapports:view"
  | "rapports:create"
  | "notifications:view"
  | "historique:view";

// Mapping des rôles aux permissions
export const rolePermissions: Record<UserRole, Permission[]> = {
  administrateur: [
    "dashboard:view",
    "reclamations:view",
    "reclamations:create",
    "reclamations:edit",
    "reclamations:delete",
    "reclamations:assign",
    "utilisateurs:view",
    "utilisateurs:create",
    "utilisateurs:edit",
    "utilisateurs:delete",
    "inventaire:view",
    "inventaire:create",
    "inventaire:edit",
    "inventaire:delete",
    "materiel:view",
    "materiel:create",
    "materiel:edit",
    "materiel:delete",
    "rapports:view",
    "rapports:create",
    "notifications:view",
    "historique:view",
  ],
  enseignant: [
    "dashboard:view",
    "reclamations:view",
    "reclamations:create",
    "inventaire:view",
    "materiel:view",
    "notifications:view",
    "historique:view",
  ],
  etudiant: [
    "dashboard:view",
    "reclamations:view",
    "reclamations:create",
    "notifications:view",
    "historique:view",
  ],
  technicien: [
    "dashboard:view",
    "reclamations:view",
    "reclamations:edit",
    "inventaire:view",
    "inventaire:edit",
    "materiel:view",
    "materiel:edit",
    "notifications:view",
    "historique:view",
  ],
};

// Vérifier si un rôle a une permission spécifique
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

// Vérifier si un rôle a toutes les permissions spécifiées
export function hasAllPermissions(
  role: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.every((permission) =>
    rolePermissions[role].includes(permission)
  );
}

// Vérifier si un rôle a au moins une des permissions spécifiées
export function hasAnyPermission(
  role: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) =>
    rolePermissions[role].includes(permission)
  );
}
