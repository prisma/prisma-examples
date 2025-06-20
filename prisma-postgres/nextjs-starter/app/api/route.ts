import { addQuote, getQuotes } from "@/lib/utils/query";
import { z } from "zod";

export const runtime = "edge";

// disabling caching
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const parser = z.enum(["TTL", "SWR", "BOTH", "NONE"]);
  const parsedOutput = await parser.safeParseAsync(searchParams.get("cache"));

  if (!parsedOutput.success) {
    return new Response(JSON.stringify("Invalid search parameter."), {
      status: 400,
    });
  }

  let map = new Map();

  // When TTL is selected
  map.set("TTL", {
    ttl: 30,
  });

  // When SWR is selected
  map.set("SWR", {
    swr: 30,
  });

  // When TTL + SWR is selected
  map.set("BOTH", {
    ttl: 30,
    swr: 60,
  });

  // This ensures no caching is performed and only the Accelerate connection pool is used
  map.set("NONE", undefined);

  const data = await getQuotes(map.get(parsedOutput.data));

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(request: Request) {
  const response = await fetch("https://api.quotable.io/random", {
    cache: "no-cache",
  });

  const data = await response.json();

  await addQuote(data.content);

  return new Response(JSON.stringify({ quote: data.content }), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
