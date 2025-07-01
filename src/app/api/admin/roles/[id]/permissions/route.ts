import { getServerSession } from "#/lib/auth";
import { db } from "#/server/db";
import { rolePermissions } from "#/server/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

const AVAILABLE_PERMISSIONS = [
  {
    id: "manage_users",
    name: "Gérer les utilisateurs",
    description: "Créer, modifier et supprimer des utilisateurs",
  },
  {
    id: "manage_roles",
    name: "Gérer les rôles",
    description: "Modifier les permissions des rôles",
  },
  {
    id: "view_audit_logs",
    name: "Voir les journaux d'audit",
    description: "Accéder aux journaux d'audit du système",
  },
  {
    id: "manage_content",
    name: "Gérer le contenu",
    description: "Créer, modifier et supprimer du contenu",
  },
  {
    id: "approve_content",
    name: "Approuver le contenu",
    description: "Valider le contenu créé par les utilisateurs",
  },
];

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

// Récupérer les permissions d'un rôle
export async function GET(
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

    const roleId = params.id;
    if (!roleId) {
      return NextResponse.json({ error: "ID du rôle requis" }, { status: 400 });
    }

    // Récupérer les permissions actuelles du rôle
    const rolePermissionsList = await db
      .select({
        id: rolePermissions.id,
        permissionId: rolePermissions.permissionId,
      })
      .from(rolePermissions)
      .where(
        eq(rolePermissions.role, roleId as "user" | "moderator" | "admin"),
      );

    const rolePermissionIds = rolePermissionsList.map((p) => p.permissionId);

    // Récupérer toutes les permissions disponibles et les marquer comme activées ou non
    const allPermissionsWithStatus = AVAILABLE_PERMISSIONS.map(
      (permission) => ({
        ...permission,
        enabled: rolePermissionIds.includes(permission.id),
      }),
    );

    return NextResponse.json(allPermissionsWithStatus);
  } catch (error) {
    console.error("Erreur lors de la récupération des permissions:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Mettre à jour les permissions d'un rôle
export async function PUT(
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

    const roleId = params.id;
    if (!roleId) {
      return NextResponse.json({ error: "ID du rôle requis" }, { status: 400 });
    }

    // Extraire les permissions du corps de la requête
    const data = (await request.json()) as { permissions: string[] };
    const { permissions: newPermissions } = data;

    if (!Array.isArray(newPermissions)) {
      return NextResponse.json(
        { error: "Format de permissions invalide" },
        { status: 400 },
      );
    }

    const roleType = roleId as "user" | "moderator" | "admin";

    // Supprimer les permissions existantes
    await db.delete(rolePermissions).where(eq(rolePermissions.role, roleType));

    // Ajouter les nouvelles permissions
    if (newPermissions.length > 0) {
      const valuesToInsert = newPermissions.map((permissionId) => ({
        id: `${roleId}_${permissionId}`,
        role: roleType,
        permissionId,
        createdAt: new Date(),
      }));

      await db.insert(rolePermissions).values(valuesToInsert);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des permissions:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
