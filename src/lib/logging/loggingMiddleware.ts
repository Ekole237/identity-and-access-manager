import { logger } from "#/lib/Pino";
import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { logAccessAttempt } from "./accessLogs";

// Interface pour la session
interface SessionUser {
  id: string;
  name?: string;
  email?: string;
}

interface SessionCookie {
  user: SessionUser;
}

/**
 * Middleware de logging pour capturer les événements d'accès
 * @param request La requête entrante
 * @param handler La fonction à exécuter après le middleware
 */
export async function loggingMiddleware(
  request: NextRequest,
  handler: () => Promise<NextResponse>,
): Promise<NextResponse> {
  const startTime = performance.now();
  const url = request.nextUrl.pathname;
  const method = request.method;
  const sessionCookie = getSessionCookie(request) as SessionCookie | null;
  const userId = sessionCookie?.user?.id;

  // Log de base (utilise try-catch pour éviter les erreurs dans Edge Runtime)
  try {
    logger.info({
      msg: "Request started",
      url,
      method,
      userId: userId ?? "anonymous",
    });
  } catch (e) {
    console.log("Logging error:", e);
  }

  try {
    // Exécuter la requête
    const response = await handler();
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);

    // Log de fin de requête
    try {
      logger.info({
        msg: "Request completed",
        url,
        method,
        status: response.status,
        responseTime,
        userId: userId ?? "anonymous",
      });
    } catch (e) {
      console.log("Logging error:", e);
    }

    // Log des événements d'accès aux pages protégées
    if (
      url.startsWith("/admin") ||
      url.startsWith("/moderator") ||
      url.startsWith("/profile")
    ) {
      try {
        await logAccessAttempt({
          id: crypto.randomUUID(),
          userId,
          eventType:
            response.status === 200 ? "login_success" : "access_denied",
          eventDetails: JSON.stringify({ url, method }),
          success: response.status === 200,
          authMethod: "email_password", // Par défaut
          ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
          userAgent: request.headers.get("user-agent") ?? undefined,
          responseTime,
        });
      } catch (e) {
        console.log("Access log error:", e);
      }
    }

    // Log des événements d'authentification
    if (url.startsWith("/api/auth")) {
      // On détecte le type d'authentification basé sur l'URL
      let authMethod:
        | "email_password"
        | "github"
        | "google"
        | "magic_link"
        | "2fa" = "email_password";
      if (url.includes("github")) {
        authMethod = "github";
      } else if (url.includes("google")) {
        authMethod = "google";
      }

      try {
        await logAccessAttempt({
          id: crypto.randomUUID(),
          userId,
          eventType:
            response.status === 200 ? "login_success" : "login_failure",
          eventDetails: JSON.stringify({ url, method }),
          success: response.status === 200,
          authMethod,
          ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
          userAgent: request.headers.get("user-agent") ?? undefined,
          responseTime,
        });
      } catch (e) {
        console.log("Auth log error:", e);
      }
    }

    return response;
  } catch (error) {
    // Log d'erreur
    try {
      logger.error({
        msg: "Request error",
        url,
        method,
        error,
        userId: userId ?? "anonymous",
      });
    } catch (e) {
      console.log("Logging error:", e);
    }

    // Log de l'erreur dans la base de données
    try {
      await logAccessAttempt({
        id: crypto.randomUUID(),
        userId,
        eventType: "access_denied",
        eventDetails: JSON.stringify({
          url,
          method,
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        success: false,
        authMethod: "email_password", // Par défaut
        ipAddress: request.headers.get("x-forwarded-for") ?? undefined,
        userAgent: request.headers.get("user-agent") ?? undefined,
      });
    } catch (logError) {
      console.log("Failed to log error:", logError);
    }

    // Renvoyer une réponse d'erreur
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
