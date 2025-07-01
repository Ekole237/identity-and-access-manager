// src/lib/auth/permissions.ts
import { db } from "#/server/db";
import { permissions, rolePermissions } from "#/server/db/schema";
import { QUERIES } from "#/server/queries";
import { eq } from "drizzle-orm";

export async function checkPermission(
  userId: string,
  permissionName: string,
): Promise<boolean> {
  try {
    // Récupérer le rôle de l'utilisateur
    const user = await QUERIES.user.findById(userId);

    if (!user) return false;

    // Vérifier si le rôle a la permission requise
    const permission = await QUERIES.permission.findByName(permissionName);

    if (!permission) return false;

    const hasPermission = await QUERIES.rolePermission.findByRole(user.role!);

    return !!hasPermission;
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
}

// Cache des permissions pour optimisation
const permissionCache = new Map<string, Set<string>>();

// Récupérer toutes les permissions pour un rôle (avec mise en cache)
export async function getRolePermissions(role: string): Promise<Set<string>> {
  // Vérifier le cache
  if (permissionCache.has(role)) {
    return permissionCache.get(role)!;
  }

  try {
    const result = await db
      .select({
        permissionName: permissions.name,
      })
      .from(rolePermissions)
      .innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
      .where(eq(rolePermissions.role, role as "user" | "moderator" | "admin"));

    const permissionSet = new Set(result.map((p) => p.permissionName));
    permissionCache.set(role, permissionSet);

    return permissionSet;
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    return new Set();
  }
}
