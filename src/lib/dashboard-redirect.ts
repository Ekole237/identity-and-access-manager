// Type pour représenter une session simplifiée dans notre application
interface SessionUser {
  id: string;
  name?: string;
  email?: string;
}

interface SessionData {
  user: SessionUser;
}

// Fonction pour rediriger l'utilisateur vers son tableau de bord en fonction de son rôle
export async function getDashboardPathForRole(
  session: SessionData | null,
): Promise<string> {
  if (!session) {
    return "/sign-in";
  }

  try {
    // Utilisation d'une API au lieu d'appeler directement la base de données
    const response = await fetch(
      `/api/auth/user-role?userId=${session.user.id}`,
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du rôle");
    }

    const data = await response.json();
    const userRole = data.role;

    switch (userRole) {
      case "admin":
        return "/admin";
      case "moderator":
        return "/moderator";
      case "user":
      default:
        return "/profile";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle:", error);
    return "/profile"; // Par défaut, rediriger vers le profil en cas d'erreur
  }
}

// Fonction pour vérifier si l'utilisateur a accès à une certaine route
export async function canAccessRoute(
  session: SessionData | null,
  route: string,
): Promise<boolean> {
  if (!session) {
    return false;
  }

  try {
    // Utilisation d'une API au lieu d'appeler directement la base de données
    const response = await fetch(
      `/api/auth/user-role?userId=${session.user.id}`,
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du rôle");
    }

    const data = await response.json();
    const userRole = data.role;

    switch (route) {
      case "/admin":
        return userRole === "admin";
      case "/moderator":
        return userRole === "admin" || userRole === "moderator";
      default:
        return true;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'accès:", error);
    return false; // Par défaut, refuser l'accès en cas d'erreur
  }
}
