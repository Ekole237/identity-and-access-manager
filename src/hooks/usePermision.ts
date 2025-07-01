import { useSession } from "#/lib/auth-client";
import { checkPermission } from "#/lib/permissions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function usePermission(requiredPermission: string) {
  const { data: session, isPending: loading } = useSession();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const checkUserPermission = async () => {
        // Vérifier la permission dans la base de données
        const permitted = await checkPermission(
          session.user.id,
          requiredPermission,
        );
        setHasPermission(permitted);

        if (!permitted) {
          router.push("/access-denied");
        }
      };

      void checkUserPermission();
    }
  }, [loading, requiredPermission, router, session]);

  return { hasPermission, loading: loading || hasPermission === null };
}
