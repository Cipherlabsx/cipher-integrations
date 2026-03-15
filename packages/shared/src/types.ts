/** Pool as returned by the adapter API (`GET /api/v1/pools`). */
export interface AdapterPool {
  id: string;
  programId: string;
  baseMint: string;
  quoteMint: string;
  priceQ6464: string;
  priceNumber: number | null;
  baseVault: string;
  quoteVault: string;
  creatorFeeVault: string | null;
  holdersFeeVault: string | null;
  nftFeeVault: string | null;
  activeBin: number;
  initialBin: number;
  admin: string;
  pausedBits: number;
  binStepBps: number;
  baseFeeBps: number;
  liquidityQuote?: number | string | null;
  tvlLockedQuote?: number | string | null;
}

/** Volume response from `GET /api/v1/volumes`. */
export interface AdapterVolumeResponse {
  tf?: string;
  volumes?: Record<string, number>;
}

/** Single price entry from `GET /api/v1/tokens/prices`. */
export interface AdapterPrice {
  mint: string;
  priceUsd: number | null;
}

/** Prices response from `GET /api/v1/tokens/prices`. */
export interface AdapterPricesResponse {
  prices?: AdapterPrice[];
}

/** Pools response from `GET /api/v1/pools`. */
export interface AdapterPoolsResponse {
  pools?: AdapterPool[];
}
