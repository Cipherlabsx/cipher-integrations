import { describe, it, expect } from "vitest";
import { fetchDailyVolumeAndFees } from "../src/index.js";

describe("DefiLlama volume adapter", () => {
  it("returns valid FetchResult shape from live API", async () => {
    const now = Math.floor(Date.now() / 1000);
    const result = await fetchDailyVolumeAndFees(now);

    expect(result).toHaveProperty("dailyVolume");
    expect(result).toHaveProperty("dailyFees");
    expect(result).toHaveProperty("timestamp");

    expect(typeof result.dailyVolume).toBe("string");
    expect(typeof result.dailyFees).toBe("string");
    expect(result.timestamp).toBe(now);

    // Volume and fees should be parseable numbers
    const vol = Number(result.dailyVolume);
    const fees = Number(result.dailyFees);
    expect(Number.isFinite(vol)).toBe(true);
    expect(Number.isFinite(fees)).toBe(true);

    // Fees should be <= volume (fees are a fraction of volume)
    expect(fees).toBeLessThanOrEqual(vol);
  }, 15_000);
});
