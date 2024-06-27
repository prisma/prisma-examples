export interface QuoteData {
  id: number
  quote: string
  createdAt: string
}

export interface CacheInfo {
  cacheStatus: string
  region: string
  lastModified: string
}

export interface QuoteResult {
  data: QuoteData
  info: CacheInfo
  time: number
}
