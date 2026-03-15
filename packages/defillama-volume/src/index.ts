/**
 * DefiLlama dimension-adapter for CipherDLMM (Orbit Finance).
 *
 * Reports daily volume and fees by fetching from the Orbit DEX adapter API.
 * This is the development version that imports from the shared package.
 * The PR-ready self-contained version is in pr/orbit-finance.ts.
 */

import { fetchPools, fetchVolumes, fetchPrices } from "@cipher-integrations/shared";

export interface FetchResult {
  dailyVolume: string;
  dailyFees: string;
  timestamp: number;
}

/**
 * Fetch daily volume and fees across all CipherDLMM pools.
 *
 * Logic matches frontend/app/api/v1/stats/summary/route.ts:
 *   1. Get all pools → pool IDs, quote mints, fee rates
 *   2. Get 24h volumes in quote currency
 *   3. Get quote token USD prices
 *   4. dailyVolume = Σ(volumeQuote × quotePriceUsd)
 *   5. dailyFees  = Σ(volumeUsd  × baseFeeBps / 10000)
 */
export async function fetchDailyVolumeAndFees(
  timestamp: number,
  adapterBase?: string,
): Promise<FetchResult> {
  const pools = await fetchPools(adapterBase);
  const poolIds = pools.map((p) => p.id);
  const quoteMints = [...new Set(pools.map((p) => p.quoteMint))];

  const [volMap, priceMap] = await Promise.all([
    fetchVolumes(poolIds, "24h", adapterBase),
    fetchPrices(quoteMints, adapterBase),
  ]);

  let dailyVolume = 0;
  let dailyFees = 0;

  for (const pool of pools) {
    const volQuote = volMap[pool.id] ?? 0;
    const quotePrice = priceMap[pool.quoteMint] ?? 0;
    const volUsd = volQuote * quotePrice;

    dailyVolume += volUsd;
    dailyFees += volUsd * ((pool.baseFeeBps ?? 0) / 10_000);
  }

  return {
    dailyVolume: dailyVolume.toString(),
    dailyFees: dailyFees.toString(),
    timestamp,
  };
}
