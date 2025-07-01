// src/lib/logging/accessLogs.ts
import { logger } from "#/lib/Pino";
import { db } from "#/server/db";
import { authLogs } from "#/server/db/schema";

type AuthLogValues = {
  userId?: string;
  eventType: string;
  eventDetails: string;
  success: boolean;
  authMethod: string;
  ipAddress?: string;
  userAgent?: string;
  responseTime?: number;
} & typeof authLogs.$inferInsert;

export async function logAccessAttempt(values: AuthLogValues) {
  try {
    const result = await db.insert(authLogs).values({
      ...values,
      ipAddress: values.ipAddress ?? undefined,
      userAgent: values.userAgent ?? undefined,
      timestamp: new Date(),
    });

    try {
      logger.info({ msg: "Access log recorded", eventType: values.eventType });
    } catch (logError) {
      console.log("Logger error:", logError);
    }

    return result;
  } catch (error) {
    try {
      logger.error({ msg: "Failed to log access attempt", error });
    } catch (logError) {
      console.log("Logger error:", logError);
    }

    console.error("Database error in logAccessAttempt:", error);
    // Ne pas faire échouer le middleware si la journalisation échoue
    return null;
  }
}
