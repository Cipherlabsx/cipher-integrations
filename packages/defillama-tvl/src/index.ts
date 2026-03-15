/**
 * DefiLlama TVL adapter for CipherDLMM (Orbit Finance).
 *
 * Enumerates all pool vault addresses via the adapter API,
 * then returns them for on-chain balance verification.
 *
 * Development version — imports from the shared package.
 * PR-ready self-contained version is in pr/orbit-finance.ts.
 */

import { fetchPools } from "@cipher-integrations/shared";

/**
 * Get all vault token accounts across CipherDLMM pools.
 *
 * These are SPL token accounts holding base and quote reserves.
 * DefiLlama's `sumTokens2` reads their on-chain balances and
 * converts to USD using their own price feeds.
 */
export async function getVaultTokenAccounts(
  adapterBase?: string,
): Promise<string[]> {
  const pools = await fetchPools(adapterBase);
  const tokenAccounts: string[] = [];

  for (const pool of pools) {
    if (pool.baseVault) tokenAccounts.push(pool.baseVault);
    if (pool.quoteVault) tokenAccounts.push(pool.quoteVault);
  }

  return tokenAccounts;
}
