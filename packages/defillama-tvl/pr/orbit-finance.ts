/**
 * CipherDLMM (Orbit Finance) — DefiLlama TVL adapter
 *
 * Submittable to: DefiLlama/DefiLlama-Adapters  →  projects/orbit-finance/index.js
 *
 * This file is self-contained. TVL = sum of all token balances held in
 * CipherDLMM pool vaults (base_vault + quote_vault per pool).
 *
 * Program ID: Fn3fA3fjsmpULNL7E9U79jKTe1KHxPtQeWdURCbJXCnM
 * Network: Solana Mainnet
 */

// @ts-nocheck — DefiLlama adapter repo uses CommonJS require()
const { sumTokens2 } = require("../helper/solana");

const ADAPTER_BASE = "https://orbit-dex.api.cipherlabsx.com";

async function tvl() {
  // Fetch pool list to get vault addresses
  const res = await fetch(`${ADAPTER_BASE}/api/v1/pools`);
  const data = await res.json();
  const pools = Array.isArray(data?.pools) ? data.pools : [];

  // Collect all vault SPL token accounts (base + quote per pool)
  const tokenAccounts: string[] = [];
  for (const pool of pools) {
    if (pool.baseVault) tokenAccounts.push(pool.baseVault);
    if (pool.quoteVault) tokenAccounts.push(pool.quoteVault);
  }

  // sumTokens2 reads on-chain balances and converts to USD
  return sumTokens2({ tokenAccounts });
}

module.exports = {
  timetravel: false,
  solana: { tvl },
  methodology:
    "TVL is the sum of token balances in all CipherDLMM pool vaults (base + quote) on Solana.",
};
