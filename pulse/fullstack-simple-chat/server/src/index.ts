import * as socket from "socket.io";
import { Server } from "socket.io";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";

const prisma = new PrismaClient().$extends(
  withPulse({
    apiKey: process.env.PULSE_API_KEY || "",
  })
);

const app = express();
app.use(cors());

app.get(`/messages`, async (_: Request, res: Response) => {
  const messages = await prisma.message.findMany();
  res.json(messages);
});

const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: { origin: true },
});

io.on(`connection`, async (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on(`disconnect`, () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on(`chat-message`, async (text) => {
    console.log(`Received message: ${text} (${socket.id})`);
    await prisma.message.create({
      data: {
        text,
        senderSocketId: socket.id,
      },
    });
  });
});

server.listen(4000, async () => {
  console.log(`Server running on http://localhost:4000`);
  await subscribeToChat(io);
});

async function subscribeToChat(io: Server) {
  console.log(`Subscribe to new messages with Prisma Client ...`);
  const subscription = await prisma.message.subscribe({ create: {} });
  if (subscription instanceof Error) {
    throw subscription;
  }

  // Handle Prisma subscription events
  for await (const event of subscription) {
    console.log(`New event from Pulse: `, event);
    io.sockets.emit("chat-message", event.after);
  }
}
