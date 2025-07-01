import { getServerSession } from "#/lib/auth";
import { db } from "#/server/db";
import { user as usersTable } from "#/server/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

// Vérification des permissions admin
async function checkAdminPermission() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return { allowed: false, status: 401, message: "Non autorisé" };
  }

  if (session.user.role !== "admin") {
    return { allowed: false, status: 403, message: "Accès refusé" };
  }

  return { allowed: true };
}

// Modification d'un utilisateur
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Vérification des permissions
    const permission = await checkAdminPermission();
    if (!permission.allowed) {
      return NextResponse.json(
        { error: permission.message },
        { status: permission.status },
      );
    }

    // Récupération de l'ID utilisateur
    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 },
      );
    }

    // Récupération des données
    const data = (await request.json()) as {
      name?: string;
      email?: string;
      role?: string;
    };
    const { name, email, role } = data;

    // Validation des données
    if (!name && !email && !role) {
      return NextResponse.json(
        { error: "Aucune donnée à mettre à jour" },
        { status: 400 },
      );
    }

    // Construire l'objet de mise à jour
    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    // Mise à jour de l'utilisateur
    await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Suppression d'un utilisateur
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Vérification des permissions
    const permission = await checkAdminPermission();
    if (!permission.allowed) {
      return NextResponse.json(
        { error: permission.message },
        { status: permission.status },
      );
    }

    // Récupération de l'ID utilisateur
    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 },
      );
    }

    // Suppression de l'utilisateur
    await db.delete(usersTable).where(eq(usersTable.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
