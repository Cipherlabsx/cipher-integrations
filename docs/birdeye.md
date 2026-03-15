# Birdeye Integration — CipherDLMM

## Overview

Birdeye indexes Solana programs by parsing on-chain events and transaction data. They provide token analytics, charts, and portfolio tracking.

## What Birdeye Needs

1. **Program ID**: `Fn3fA3fjsmpULNL7E9U79jKTe1KHxPtQeWdURCbJXCnM`
2. **IDL**: `orbit_finance.json` for event decoding
3. **Swap event**: `SwapExecuted` — contains all fields for trade indexing

## SwapExecuted Event Fields

- `pool` (Pubkey) — Pool address
- `user` (Pubkey) — Trader wallet
- `in_mint` / `out_mint` (Pubkey) — Token pair
- `amount_in` / `amount_out` (u64) — Trade amounts
- `total_fee` (u64) — Fee charged
- `price_after_q64_64` (u128) — Post-swap price

## Registration Steps

1. Contact Birdeye via their DEX listing / partnership form
2. Provide program ID and IDL
3. Birdeye indexes `SwapExecuted` events to build:
   - Token price charts
   - Trade history
   - Volume analytics
   - Pair discovery
4. Pools appear on Birdeye once indexing is active

## Additional Events Available

CipherDLMM emits 20 event types. Key ones for analytics:
- `PoolInitialized` — New pool creation
- `LiquidityDeposited` / `LiquidityWithdrawnUser` — LP activity
- `FeesDistributed` — Detailed fee breakdown
- `BinLiquidityUpdated` — Real-time bin reserve changes

## IDL Location

```
frontend/components/tokens/idl/orbit_finance.json
```
