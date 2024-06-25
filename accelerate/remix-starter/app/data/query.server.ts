import prisma from "./utils/prisma.server";
import { CacheStrategy } from "../lib/types";

export const getQuotes = async (strategy?: CacheStrategy) => {
  const start = Date.now();

  const result = await prisma.quotes
    .findMany({
      // You can find the `cacheStrategy` options [here](https://www.prisma.io/docs/accelerate/caching#cache-strategies). The `cacheStrategy` can also be undefined, which would mean only connection pooling is being used.
      cacheStrategy: strategy,
      orderBy: {
        id: "desc",
      },
      take: 1,
    })
    .withAccelerateInfo();

  console.log(result);

  return {
    data: result?.data?.[0],
    info: result.info,
    time: Date.now() - start,
  };
};
