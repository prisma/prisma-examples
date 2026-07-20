import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { prisma } from "./lib/prisma.js";

const app = new Hono();

app.get("/", async (c) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
    orderBy: { createdAt: "desc" },
  });

  return c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Prisma Compute Hono</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 720px; margin: 48px auto; padding: 0 20px; color: #111; }
      a { color: #0c6; }
      li { margin: 12px 0; }
      code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>Hono on Prisma Compute</h1>
    <p>This page was rendered by Hono and Prisma ORM.</p>
    <p>JSON endpoint: <a href="/api/users"><code>/api/users</code></a></p>
    <ul>
      ${users
        .map(
          (user) =>
            `<li><strong>${user.name ?? user.email}</strong> <span>@${user.username ?? "no-handle"}</span> - ${user.posts.length} post(s)</li>`,
        )
        .join("")}
    </ul>
  </body>
</html>`);
});

app.get("/api/users", async (c) => {
  const users = await prisma.user.findMany({
    include: { posts: true },
    orderBy: { createdAt: "desc" },
  });

  return c.json(users);
});

const port = Number(process.env.PORT ?? 8080);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

