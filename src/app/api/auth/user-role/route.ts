import { QUERIES } from "#/server/queries";
import { type NextRequest, NextResponse } from "next/server";

// Cette fonction ne s'exécute que côté serveur
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 },
      );
    }

    // Récupérer le rôle de l'utilisateur depuis la base de données
    const userRole = await QUERIES.userRole.findByUserId(userId);

    if (!userRole) {
      // Par défaut, utiliser le rôle "user" si aucun rôle n'est trouvé
      return NextResponse.json({ role: "user" });
    }

    return NextResponse.json({ role: userRole.role });
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
