import { getDb } from "./db.ts";

export default {
  async fetch(req) {
    if (req.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (!Deno.env.get("DIRECT_URL")) {
      return new Response("DIRECT_URL environment variable is not set", { status: 500 });
    }

    const prisma = getDb({
      connectionString: Deno.env.get("DIRECT_URL")!,
    });

    const quotes = await prisma.quotes.findMany({})

    return Response.json({ data: quotes });
  },
} satisfies Deno.ServeDefaultExport;
