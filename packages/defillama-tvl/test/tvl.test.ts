import { describe, it, expect } from "vitest";
import { getVaultTokenAccounts } from "../src/index.js";

describe("DefiLlama TVL adapter", () => {
  it("returns vault token accounts from live API", async () => {
    const vaults = await getVaultTokenAccounts();

    expect(Array.isArray(vaults)).toBe(true);
    // Each pool contributes 2 vaults (base + quote)
    // so total should be even and > 0 if pools exist
    expect(vaults.length).toBeGreaterThan(0);
    expect(vaults.length % 2).toBe(0);

    // Each vault should be a valid base58 Solana pubkey (32-44 chars)
    for (const vault of vaults) {
      expect(typeof vault).toBe("string");
      expect(vault.length).toBeGreaterThanOrEqual(32);
      expect(vault.length).toBeLessThanOrEqual(44);
    }
  }, 15_000);
});
