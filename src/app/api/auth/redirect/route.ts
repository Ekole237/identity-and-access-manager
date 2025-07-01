import { QUERIES } from "#/server/queries";
import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

// Type pour la session
interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface SessionCookie {
  user: SessionUser;
}

export async function GET(request: NextRequest) {
  const session = getSessionCookie(request) as SessionCookie | null;

  if (!session) {
    // Pas de session, rediriger vers la page de connexion
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    // Récupérer le rôle de l'utilisateur
    const userRole = await QUERIES.userRole.findByUserId(session.user.id);

    if (!userRole) {
      // Aucun rôle trouvé, rediriger vers le profil par défaut
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Rediriger en fonction du rôle
    switch (userRole.role) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", request.url));
      case "moderator":
        return NextResponse.redirect(new URL("/moderator", request.url));
      case "user":
      default:
        return NextResponse.redirect(new URL("/profile", request.url));
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle:", error);
    // En cas d'erreur, rediriger vers le profil par défaut
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}
