# Integration Partner Pipeline

Single source of truth for partner outreach and integration status.

---

| Partner | Contact | Channel | Status | Last touch | Next action |
|---|---|---|---|---|---|
| Kamino | — | Discord | Waiting — moderator response pending | 2026-03-22 | Await response |
| Save Finance | @Sojuuuu54 | Telegram | Not contacted | — | Ricardo DM |
| marginfi | Project listing contact | Telegram | Not contacted | — | Ricardo DM (not @nathanzebedee) |
| 0x / Matcha | @matchaxyz | Twitter DM + Pylon form | Not contacted | — | Ricardo DM + form |
| 1inch | — | Email + Discord #developers | Not contacted | — | Ricardo email + Discord |
| OpenOcean | Guy.P | t.me/OpenOceanAPI + email | Not contacted | — | Ricardo TG + email |
| Dune | — | Internal | Pending sign-off | — | Ricardo sign off on namespace + IDL version |
| Squads | — | Internal | Pending setup | — | Ricardo transfer upgrade authority + DAO treasury |
| Kamino (kliquidity-sdk) | — | — | Blocked — waiting on Discord response | 2026-03-22 | Unblocks Kai TypeScript adapter |
| GOAT SDK / SendAI | — | GitHub | PR open — goat-sdk/goat#548 | 2026-03-22 | Await upstream review |

---

# Technical Integration Status

| Integration | Repo | Status | Notes |
|---|---|---|---|
| Jupiter AMM trait | jup-ag/jupiter-amm-interface#28 | **PR open — awaiting review** | 1-line `Swap::CipherDlmm` variant. Ricardo to ping #protocol-integrations |
| Jupiter AMM adapter | jup-ag/jupiter-amm-implementation#17 | **PR open — awaiting review** | Full adapter, 24 tests passing |
| GeckoTerminal DEX adapter | Cipherlabsx/orbit_finance_dex_adapter_api | **LIVE 2026-03-25** | All 4 endpoints live on orbit-dex.api.cipherlabsx.com |
| DefiLlama volume adapter | dimension-adapters (fork) | PR ready — pending submission | Dune SQL implementation in packages/defillama-volume/ |
| DefiLlama TVL adapter | DefiLlama-Adapters (fork) | PR ready — pending submission | — |

---

# Lyra / Quant Backend

| Item | Status |
|---|---|
| Ghost live positions bug | **FIXED 2026-03-25** |
| SOL/USDC LIVE position on Meteora | Unblocked — monitoring |
| Meteora API migration | Done — `dlmm.datapi.meteora.ag` |
| GeckoTerminal endpoints | **LIVE 2026-03-25** — `/api/v1/coingecko/*` |
