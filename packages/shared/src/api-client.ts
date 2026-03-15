import { ADAPTER_API_BASE } from "./constants.js";
import type {
  AdapterPool,
  AdapterPoolsResponse,
  AdapterPrice,
  AdapterPricesResponse,
  AdapterVolumeResponse,
} from "./types.js";

async function fetchJson<T>(url: string, timeoutMs = 10_000): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { accept: "application/json" },
      signal: ac.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

/** Fetch all pools from the adapter API. */
export async function fetchPools(
  base = ADAPTER_API_BASE,
): Promise<AdapterPool[]> {
  const resp = await fetchJson<AdapterPoolsResponse>(`${base}/api/v1/pools`);
  return Array.isArray(resp.pools) ? resp.pools : [];
}

/** Fetch 24h volumes (quote-denominated) for the given pool IDs. */
export async function fetchVolumes(
  poolIds: string[],
  tf = "24h",
  base = ADAPTER_API_BASE,
): Promise<Record<string, number>> {
  if (poolIds.length === 0) return {};
  const qs = new URLSearchParams({ tf, pools: poolIds.join(",") });
  const resp = await fetchJson<AdapterVolumeResponse>(
    `${base}/api/v1/volumes?${qs.toString()}`,
  );
  return resp.volumes ?? {};
}

/** Fetch USD prices for the given token mints. */
export async function fetchPrices(
  mints: string[],
  base = ADAPTER_API_BASE,
): Promise<Record<string, number>> {
  if (mints.length === 0) return {};
  const q = encodeURIComponent(mints.join(","));
  const resp = await fetchJson<AdapterPricesResponse>(
    `${base}/api/v1/tokens/prices?mints=${q}`,
  );
  const map: Record<string, number> = {};
  for (const p of resp.prices ?? []) {
    if (p.priceUsd != null && Number.isFinite(p.priceUsd)) {
      map[p.mint] = p.priceUsd;
    }
  }
  return map;
}
