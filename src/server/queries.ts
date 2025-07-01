import { db } from "#/server/db";
import { eq } from "drizzle-orm";
import { authLogs, permissions, rolePermissions, user } from "./db/schema";

type LoginLogs = typeof authLogs.$inferInsert;

export const QUERIES = {
  user: {
    findById: async (id: string) => {
      return await db.query.user.findFirst({ where: eq(user.id, id) });
    },
    all: async () => {
      return await db.query.user.findMany();
    },
  },
  permission: {
    findByName: async (name: string) => {
      return await db.query.permissions.findFirst({
        where: eq(permissions.name, name),
      });
    },
  },
  rolePermission: {
    findByRole: async (role: string) => {
      return await db.query.rolePermissions.findFirst({
        where: eq(rolePermissions.role, role as "user" | "moderator" | "admin"),
      });
    },
  },
  userRole: {
    findByUserId: async (userId: string) => {
      return await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: {
          role: true,
        },
      });
    },
  },
  loginLogs: {
    insert: async (data: LoginLogs) => {
      return await db.insert(authLogs).values(data);
    },
  },
};
