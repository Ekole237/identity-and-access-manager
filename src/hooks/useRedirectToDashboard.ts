import { useSession } from "#/lib/auth-client";
import { getDashboardPathForRole } from "#/lib/dashboard-redirect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRedirectToDashboard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      // Ne rien faire si on est déjà en train de rediriger
      // ou si la session est en cours de chargement
      if (isRedirecting || isPending) return;

      // Si pas de session, ne pas rediriger (laissez le comportement par défaut)
      if (!session) return;

      try {
        setIsRedirecting(true);
        const dashboardPath = await getDashboardPathForRole(session);
        router.push(dashboardPath);
      } catch (error) {
        console.error("Erreur lors de la redirection:", error);
        // En cas d'erreur, on redirige vers la page de profil par défaut
        router.push("/profile");
      }
    };

    void redirect();
  }, [session, isPending, router, isRedirecting]);

  return { isRedirecting };
}
