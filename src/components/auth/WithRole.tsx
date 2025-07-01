// src/components/auth/WithRole.tsx
import AccessDeniedPage from "#/app/access-denied/page";
import { useSession } from "#/lib/auth-client";
import { type ReactNode, useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";

interface WithRoleProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

export default function WithRole({
  children,
  allowedRoles,
  fallback = <AccessDeniedPage />,
}: WithRoleProps) {
  const { data: session, isPending: loading } = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          `/api/auth/user-role?userId=${session.user.id}`,
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du rôle");
        }

        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Erreur lors de la récupération du rôle:", error);
        setUserRole("user"); // Rôle par défaut en cas d'erreur
      }
    };

    void fetchUserRole();
  }, [session]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session || !allowedRoles.includes(userRole!)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
