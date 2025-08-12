import prisma from "./prisma";
import { UIMessage } from "ai";

export async function saveChat(messages: UIMessage[], id: string) {
  const session = await prisma.session.upsert({
    where: { id },
    update: {},
    create: { id },
  });

  if (!session) throw new Error("Session not found");

  const lastTwoMessages = messages.slice(-2);

  for (const msg of lastTwoMessages) {
    let content = JSON.stringify(msg.parts);
    if (msg.role === "assistant") {
      const textParts = msg.parts.filter((part) => part.type === "text");
      content = JSON.stringify(textParts);
    }

    await prisma.message.create({
      data: {
        role: msg.role === "user" ? "USER" : "ASSISTANT",
        content: content,
        sessionId: session.id,
      },
    });
  }
}
