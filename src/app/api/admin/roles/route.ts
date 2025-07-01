import { getServerSession } from "#/lib/auth";
import { db } from "#/server/db";
import { rolePermissions } from "#/server/db/schema";
import { eq } from "drizzle-orm";
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

    // Liste des rôles disponibles avec leur description
    const roles = [
      {
        id: "admin",
        name: "admin",
        description: "Administrateur avec accès complet au système",
        permissions: [],
      },
      {
        id: "moderator",
        name: "moderator",
        description: "Modérateur avec accès limité à certaines fonctionnalités",
        permissions: [],
      },
      {
        id: "user",
        name: "user",
        description: "Utilisateur standard avec accès de base",
        permissions: [],
      },
    ];

    // Récupérer les permissions associées à chaque rôle
    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => {
        // Récupérer toutes les permissions associées à ce rôle
        const permissions = await db
          .select({
            id: rolePermissions.id,
            permissionId: rolePermissions.permissionId,
          })
          .from(rolePermissions)
          .where(
            eq(rolePermissions.role, role.id as "user" | "moderator" | "admin"),
          );

        return {
          ...role,
          permissions: permissions.map((p) => ({
            id: p.permissionId,
            name: p.permissionId, // Une description plus lisible pourrait être ajoutée ultérieurement
            description: "",
          })),
        };
      }),
    );

    return NextResponse.json(rolesWithPermissions);
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
