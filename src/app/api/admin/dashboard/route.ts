import { getServerSession } from "#/lib/auth";
import { db } from "#/server/db";
import { authLogs, user } from "#/server/db/schema";
import { and, count, eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Vérification des permissions
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Vérification du rôle admin
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // Calcul des statistiques

    // 1. Nombre total d'utilisateurs
    const usersResult = await db.select({ count: count() }).from(user);
    const totalUsers = usersResult[0]?.count ?? 0;

    // 2. Nombre de rôles actifs (hardcodé pour le moment)
    const activeRoles = 3; // admin, moderator, user

    // 3. Nombre total de logs d'audit
    const logsResult = await db.select({ count: count() }).from(authLogs);
    const totalLogs = logsResult[0]?.count ?? 0;

    // 4. Connexions récentes (dernières 24h)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentLoginResult = await db
      .select({ count: count() })
      .from(authLogs)
      .where(
        and(
          eq(authLogs.eventType, "login_success"),
          gte(authLogs.timestamp, yesterday),
        ),
      );
    const recentLoginAttempts = recentLoginResult[0]?.count ?? 0;

    // 5. Tentatives de connexion échouées récentes
    const failedLoginResult = await db
      .select({ count: count() })
      .from(authLogs)
      .where(
        and(
          eq(authLogs.eventType, "login_failure"),
          eq(authLogs.success, false),
          gte(authLogs.timestamp, yesterday),
        ),
      );
    const failedLogins = failedLoginResult[0]?.count ?? 0;

    // Retourner toutes les statistiques
    return NextResponse.json({
      totalUsers,
      activeRoles,
      totalLogs,
      recentLoginAttempts,
      failedLogins,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
