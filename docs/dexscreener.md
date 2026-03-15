# DexScreener Integration — CipherDLMM

## Overview

DexScreener indexes Solana programs directly by parsing on-chain transaction logs and events. No API endpoints needed — they read from the chain.

## What DexScreener Needs

1. **Program ID**: `Fn3fA3fjsmpULNL7E9U79jKTe1KHxPtQeWdURCbJXCnM`
2. **IDL**: `orbit_finance.json` (contains event discriminators for log parsing)
3. **Key event**: `SwapExecuted`

## SwapExecuted Event Schema

```
Event: SwapExecuted
Discriminator: defined in orbit_finance.json

Fields:
  pool:                Pubkey    — Pool address
  user:                Pubkey    — Swapper's wallet
  in_mint:             Pubkey    — Input token mint
  out_mint:            Pubkey    — Output token mint
  amount_in:           u64       — Input amount (raw, with decimals)
  amount_out:          u64       — Output amount (raw, with decimals)
  total_fee:           u64       — Total fee charged
  price_after_q64_64:  u128      — Post-swap price in Q64.64 fixed-point
  ts:                  i64       — Unix timestamp
```

This event is emitted on every swap and contains all fields DexScreener needs for:
- Trade history
- Price tracking
- Volume aggregation
- Pair discovery (in_mint + out_mint)

## Other Useful Events

- `PoolInitialized` — New pair creation
- `LiquidityDeposited` / `LiquidityWithdrawnUser` — Liquidity changes
- `FeesDistributed` — Fee breakdown (protocol, creator, holders, NFT)

## Submission Steps

1. Go to DexScreener's DEX listing request
2. Submit program ID + IDL file
3. DexScreener team adds parser for `SwapExecuted` events
4. Pools appear automatically once indexing is active

## IDL Location

The canonical IDL file is at:
```
frontend/components/tokens/idl/orbit_finance.json
```

Also exported as TypeScript in `orbit_finance.ts` in the same directory.
