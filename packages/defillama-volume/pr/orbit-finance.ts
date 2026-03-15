/**
 * CipherDLMM (Orbit Finance) — DefiLlama dimension-adapter
 *
 * Submittable to: DefiLlama/dimension-adapters  →  dexs/orbit-finance/index.ts
 *
 * This file is self-contained — no imports beyond DefiLlama's own helpers.
 * It fetches volume and fee data from the Orbit DEX adapter API.
 *
 * Program ID: Fn3fA3fjsmpULNL7E9U79jKTe1KHxPtQeWdURCbJXCnM
 * Network: Solana Mainnet
 */

import { SimpleAdapter, FetchResultVolume } from "../../helpers/customBackfill";
import { CHAIN } from "../../helpers/chains";
import fetchURL from "../../utils/fetchURL";

const ADAPTER_BASE = "https://orbit-dex.api.cipherlabsx.com";

interface AdapterPool {
  id: string;
  quoteMint: string;
  baseFeeBps: number;
}

const fetch = async (timestamp: number): Promise<FetchResultVolume> => {
  // 1. Fetch all pools
  const poolsResp = await fetchURL(`${ADAPTER_BASE}/api/v1/pools`);
  const pools: AdapterPool[] = Array.isArray(poolsResp?.pools)
    ? poolsResp.pools
    : [];

  if (pools.length === 0) {
    return { dailyVolume: "0", dailyFees: "0", timestamp };
  }

  const poolIds = pools.map((p) => p.id);
  const quoteMints = [...new Set(pools.map((p) => p.quoteMint))];

  // 2. Fetch 24h volumes + quote token USD prices in parallel
  const [volResp, priceResp] = await Promise.all([
    fetchURL(
      `${ADAPTER_BASE}/api/v1/volumes?tf=24h&pools=${poolIds.join(",")}`
    ),
    fetchURL(
      `${ADAPTER_BASE}/api/v1/tokens/prices?mints=${quoteMints.join(",")}`
    ),
  ]);

  const volumes: Record<string, number> = volResp?.volumes ?? {};

  const priceMap: Record<string, number> = {};
  for (const p of priceResp?.prices ?? []) {
    if (p?.mint && p.priceUsd != null && Number.isFinite(p.priceUsd)) {
      priceMap[p.mint] = p.priceUsd;
    }
  }

  // 3. Sum daily volume and fees in USD
  let dailyVolume = 0;
  let dailyFees = 0;

  for (const pool of pools) {
    const volQuote = volumes[pool.id] ?? 0;
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
};

const adapter: SimpleAdapter = {
  adapter: {
    [CHAIN.SOLANA]: {
      fetch,
      start: "2025-01-01",
      meta: {
        methodology: {
          Volume:
            "Sum of 24h swap volume across all CipherDLMM pools, converted to USD via quote token prices from the Orbit DEX adapter API.",
          Fees:
            "Volume multiplied by each pool's fee rate (base_fee_bps / 10000). Fees are charged in the quote token domain.",
        },
      },
    },
  },
};

export default adapter;
