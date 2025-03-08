"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  type UserRole,
  type Permission,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
} from "@/lib/authorization";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simuler une requête API (à remplacer par une vraie API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Vérification simplifiée (à remplacer par une vraie vérification)
      if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "administrateur",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else if (email === "teacher@example.com" && password === "password") {
        const userData: User = {
          id: "2",
          name: "Teacher User",
          email: "teacher@example.com",
          role: "enseignant",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else if (email === "student@example.com" && password === "password") {
        const userData: User = {
          id: "3",
          name: "Student User",
          email: "student@example.com",
          role: "etudiant",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else if (email === "tech@example.com" && password === "password") {
        const userData: User = {
          id: "4",
          name: "Tech User",
          email: "tech@example.com",
          role: "technicien",
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Fonctions de vérification des permissions
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        hasPermission: checkPermission,
        hasAllPermissions: checkAllPermissions,
        hasAnyPermission: checkAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
}
