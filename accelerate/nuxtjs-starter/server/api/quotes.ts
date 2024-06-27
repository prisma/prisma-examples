import { defineEventHandler, getQuery, createError } from 'h3';
import { z } from 'zod';
import { getQuotes } from '@/lib/utils/query'; 


export default defineEventHandler(async (event) => {

  const { cache } = getQuery(event);

  const parser = z.enum(["TTL", "SWR", "BOTH", "NONE"]);
  const parsedOutput = await parser.safeParseAsync(cache);

  if (!parsedOutput.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid search parameter."
    });
  }

  let map = new Map();

  map.set("TTL", { ttl: 30 });
  map.set("SWR", { swr: 30 });
  map.set("BOTH", { ttl: 30, swr: 60 });
  map.set("NONE", undefined);

  const data = await getQuotes(map.get(parsedOutput.data));
  
  return data;
});


