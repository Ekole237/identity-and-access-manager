// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 export const createTable = pgTableCreator(
 (name) => `iam-drizzle-neon_${name}`,
 );

 export const posts = createTable(
 "post",
 (d) => ({
 id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
 name: d.varchar({ length: 256 }),
 createdAt: d
 .timestamp({ withTimezone: true })
 .default(sql`CURRENT_TIMESTAMP`)
 .notNull(),
 updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
 }),
 (t) => [index("name_idx").on(t.name)],
 );
 */

export const authMethodEnum = pgEnum("auth_method", [
  "email_password",
  "google",
  "github",
  "magic_link",
  "2fa",
]);

// Enum pour les types d'événements
export const eventTypeEnum = pgEnum("event_type", [
  "login_success",
  "login_failure",
  "logout",
  "register",
  "password_reset",
  "access_denied",
  "role_change",
]);
export const roleEnum = pgEnum("role", ["user", "moderator", "admin"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: roleEnum("role").default("user"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Table des logs d'authentification
export const authLogs = pgTable("auth_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  authMethod: authMethodEnum("auth_method").notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  eventDetails: text("event_details"),
  success: boolean("success").default(true),
  responseTime: integer("response_time"), // en millisecondes
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Table des permissions
export const permissions = pgTable("permissions", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Table de relation entre rôles et permissions
export const rolePermissions = pgTable("role_permissions", {
  id: text("id").primaryKey(),
  role: roleEnum("role").notNull(),
  permissionId: text("permission_id")
    .notNull()
    .references(() => permissions.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  authLogs: many(authLogs),
}));

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const authLogsRelations = relations(authLogs, ({ one }) => ({
  user: one(user, {
    fields: [authLogs.userId],
    references: [user.id],
  }),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);
