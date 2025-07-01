import { db } from "#/server/db";
import { authLogs, user } from "#/server/db/schema";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const eventType = searchParams.get("eventType");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const offset = parseInt(searchParams.get("offset") ?? "0");

    // Construire la requête de base avec JOIN pour récupérer le nom de l'utilisateur
    let query = db
      .select({
        id: authLogs.id,
        userId: authLogs.userId,
        userName: user.name,
        ipAddress: authLogs.ipAddress,
        userAgent: authLogs.userAgent,
        authMethod: authLogs.authMethod,
        eventType: authLogs.eventType,
        eventDetails: authLogs.eventDetails,
        success: authLogs.success,
        timestamp: authLogs.timestamp,
      })
      .from(authLogs)
      .leftJoin(user, eq(authLogs.userId, user.id))
      .orderBy(desc(authLogs.timestamp))
      .limit(limit)
      .offset(offset);

    // Ajouter des filtres si nécessaire
    const filters = [];

    // Filtre par type d'événement
    if (eventType && eventType !== "all") {
      filters.push(eq(authLogs.eventType, eventType));
    }

    // Recherche par texte
    if (search) {
      const searchPattern = `%${search}%`;
      filters.push(
        or(
          ilike(user.name, searchPattern),
          ilike(authLogs.ipAddress, searchPattern),
          ilike(authLogs.eventDetails, searchPattern),
        ),
      );
    }

    // Appliquer les filtres s'il y en a
    if (filters.length > 0) {
      query = query.where(and(...filters));
    }

    // Exécuter la requête
    const logs = await query;

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching audit logs" },
      { status: 500 },
    );
  }
}
