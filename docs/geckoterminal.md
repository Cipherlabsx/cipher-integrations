# GeckoTerminal Integration — CipherDLMM

## Overview

GeckoTerminal (by CoinGecko) provides pool charts, trade history, and analytics for DEXs. They support Solana via their Non-EVM DEX listing program.

## Submission

**Form:** GeckoTerminal Non-EVM DEX Listing Request
**URL:** Submit through CoinGecko's developer portal / contact form

**Required information:**
- Protocol name: CipherDLMM (Orbit Finance)
- Network: Solana
- Program ID: `Fn3fA3fjsmpULNL7E9U79jKTe1KHxPtQeWdURCbJXCnM`
- Website: orbitdex.io
- API base: `https://orbit-dex.api.cipherlabsx.com`

## Endpoint Mapping

| GeckoTerminal Needs | Our Endpoint | Status |
|---|---|---|
| Pool list (base/quote info) | `GET /api/v1/pools` | Ready |
| Recent trade events | `GET /api/v1/trades/{pool}` | Ready |
| OHLCV candles | `GET /api/v1/candles/{pool}` | Ready |
| Price in USD per pair | `priceNumber` field (quote-denominated) | Needs USD conversion |
| Liquidity in USD | `liquidityQuote` field | Needs USD conversion |
| Pool reserves | Not exposed | Needs adapter API change |

## Gaps to Fix (Adapter API Changes)

### 1. Add `priceUsd` to pool response
Currently `/api/v1/pools` returns `priceNumber` (price in quote currency). GeckoTerminal needs USD-denominated price.

**Fix:** Server-side quote→USD conversion in the adapter. The frontend already does this in `frontend/app/api/v1/orbit_dex/route.ts` — move this logic into the adapter itself.

### 2. Add `liquidityUsd` to pool response
Same issue — `liquidityQuote` needs to become `liquidityUsd`.

### 3. Add `reserves` to pool response
GeckoTerminal wants base and quote reserve amounts per pool. These are the vault balances, already available on-chain. Add `reserveBase` and `reserveQuote` fields to the pool response.

## Timeline

1. Fix the 3 adapter API gaps above
2. Submit the listing form
3. GeckoTerminal team reviews and adds indexing
4. Pools appear on GeckoTerminal within 1-2 weeks of approval
