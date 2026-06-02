import { createFileRoute } from "@tanstack/react-router";

import { prisma } from "../../lib/prisma.server";

export const Route = createFileRoute("/api/users")({
  server: {
    handlers: {
      GET: async () => {
        const users = await prisma.user.findMany({
          include: { posts: true },
          orderBy: { createdAt: "desc" },
        });

        return Response.json(users);
      },
    },
  },
});

