export type CacheStrategy =
  | {
      ttl: number;
      swr: number;
    }
  | {
      ttl: number;
    }
  | {
      swr: number;
    };

export type AccelerateInfo = {
  cacheStatus: "ttl" | "swr" | "miss" | "none";
  lastModified: Date;
  region: string;
  requestId: string;
  signature: string;
};

export type Quote = {
  id: number;
  quote: string;
  createdAt: string;
};

export type QuoteResult = {
  data: Quote;
  info: AccelerateInfo;
  time: number;
};

export type QuoteCacheType = "SWR" | "TTL" | "No caching" | "TTL + SWR";
