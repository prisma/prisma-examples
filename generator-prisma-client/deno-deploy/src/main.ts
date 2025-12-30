import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

// Initialize Prisma Client with the Postgres adapter
const connectionString = Deno.env.get("DATABASE_URL")!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Helper to create JSON responses
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Request handler
async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  try {
    // GET /tasks - List all tasks
    if (method === "GET" && path === "/tasks") {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: "desc" },
      });
      return json(tasks);
    }

    // POST /tasks - Create a new task
    if (method === "POST" && path === "/tasks") {
      const body = await request.json();
      const task = await prisma.task.create({
        data: {
          title: body.title,
          description: body.description,
        },
      });
      return json(task, 201);
    }

    // GET /tasks/:id - Get a specific task
    const taskMatch = path.match(/^\/tasks\/(\d+)$/);
    if (taskMatch) {
      const id = parseInt(taskMatch[1]);

      if (method === "GET") {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) return json({ error: "Task not found" }, 404);
        return json(task);
      }

      // PATCH /tasks/:id - Update a task
      if (method === "PATCH") {
        const body = await request.json();
        const task = await prisma.task.update({
          where: { id },
          data: body,
        });
        return json(task);
      }

      // DELETE /tasks/:id - Delete a task
      if (method === "DELETE") {
        await prisma.task.delete({ where: { id } });
        return json({ message: "Task deleted" });
      }
    }

    // GET / - API info
    if (method === "GET" && path === "/") {
      return json({
        name: "Prisma + Deno Task API",
        version: "1.0.0",
        endpoints: {
          "GET /tasks": "List all tasks",
          "POST /tasks": "Create a task",
          "GET /tasks/:id": "Get a task",
          "PATCH /tasks/:id": "Update a task",
          "DELETE /tasks/:id": "Delete a task",
        },
      });
    }

    return json({ error: "Not found" }, 404);
  } catch (error) {
    console.error(error);
    return json({ error: "Internal server error" }, 500);
  }
}

// Start the server
Deno.serve({ port: 8000 }, handler);
