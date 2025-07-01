// src/app/api/auth/log/route.ts
import { db } from "#/server/db";
import { authLogs } from "#/server/db/schema";
import { NextResponse } from "next/server";

type AuthLogs = typeof authLogs.$inferInsert;
export async function POST(request: Request) {
  try {
    const { userId, authMethod, eventType, responseTime } =
      (await request.json()) as AuthLogs;

    // Logger l'événement
    await db.insert(authLogs).values({
      id: crypto.randomUUID(),
      userId,
      authMethod,
      eventType,
      eventDetails: JSON.stringify({ responseTime }),
      responseTime,
      success: true,
      ipAddress: request.headers.get("x-forwarded-for") ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Log error:", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite" },
      { status: 500 },
    );
  }
}
