import { loggingMiddleware } from "#/lib/logging/loggingMiddleware";
import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

const protectedRoutes = ["/profile", "/admin", "/moderator"];
const roleRestrictedPaths = {
  "/admin": ["admin"],
  "/moderator": ["admin", "moderator"],
};

export async function middleware(request: NextRequest) {
  try {
    const handler = async () => {
      try {
        // Exclure les requêtes API d'auth et les ressources statiques
        if (
          request.nextUrl.pathname.startsWith("/api/auth") ||
          request.nextUrl.pathname.startsWith("/_next") ||
          request.nextUrl.pathname.includes(".")
        ) {
          return NextResponse.next();
        }

        const sessionCookie = getSessionCookie(request) as SessionCookie | null;
        const { pathname } = request.nextUrl;

        // Protection des routes qui nécessitent une authentification
        if (protectedRoutes.some((route) => pathname.startsWith(route))) {
          if (!sessionCookie) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
          }
        }

        // Protection des routes basées sur le rôle
        if (sessionCookie?.user) {
          for (const [path, allowedRoles] of Object.entries(
            roleRestrictedPaths,
          )) {
            if (pathname.startsWith(path)) {
              const userRole = sessionCookie.user.role ?? "user";
              if (!allowedRoles.includes(userRole)) {
                return NextResponse.redirect(
                  new URL("/access-denied", request.url),
                );
              }
            }
          }
        }

        return NextResponse.next();
      } catch (error) {
        console.error("Error in middleware handler:", error);
        return NextResponse.next();
      }
    };

    // Utiliser le middleware de logging qui enveloppe notre handler
    return await loggingMiddleware(request, handler);
  } catch (error) {
    console.error("Critical middleware error:", error);
    // En cas d'erreur critique, on laisse passer la requête
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
