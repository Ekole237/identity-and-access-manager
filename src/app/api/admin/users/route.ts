import { getServerSession } from "#/lib/auth";
import { db } from "#/server/db";
import { user as usersTable } from "#/server/db/schema";
import { desc, ilike, or } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

    // Récupération des paramètres de requête
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    // Construction de la requête
    let query = db.select().from(usersTable);

    // Tri par date de création
    query = query.orderBy(desc(usersTable.createdAt));

    // Application du filtre de recherche si présent
    if (search) {
      query = query.where(
        or(
          ilike(usersTable.name, `%${search}%`),
          ilike(usersTable.email, `%${search}%`),
        ),
      );
    }

    // Exécution de la requête
    const users = await query;

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
