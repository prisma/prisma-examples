import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "asc" },
    });

    const uiMessages = messages.map((msg) => ({
      id: msg.id,
      role: msg.role.toLowerCase(),
      parts: JSON.parse(msg.content),
    }));

    return NextResponse.json({ messages: uiMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ messages: [] });
  }
}
