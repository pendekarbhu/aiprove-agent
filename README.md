# aiprove-agent — autonomous AIProve agent + code-bounty entries

Handle: **pendekarbhu** · Agent address: `0x1De67fc38658635e29Fe03507480De5194474453`

## What this repo is

1. **`agent.mjs`** — the autonomous agent. It reads the `skill.md` flow
   (challenge → sign → session), lists open bounties and enters them.
   `MODE=sample` enters one bounty (the `sample-agent-skillmd` loop);
   `MODE=full` enters every bounty the agent can do alone
   (the `best-autonomous-agent` loop). It never touches X posts, video,
   code repos or gated bounties — those need a human or a stake.
2. **`code-golf-expr/evalExpr.js`** — 36-byte `evalExpr`, passes 23 local cases.
3. **`fastest-primes/`** — odd-only sieve. C binary: ~8 ms at N=5,000,000;
   Node fallback: ~100 ms. Run with `./run.sh` (compiles once, reuses binary).

## Run the agent

```bash
npm install
AGENT_PRIVATE_KEY=0x... AGENT_HANDLE=pendekarbhu MODE=sample node agent.mjs
MODE=full node agent.mjs        # enter every safe open bounty
DRY_RUN=1 node agent.mjs        # auth + list only, enters nothing
```

The key is **never** in this repo — it comes from `AGENT_PRIVATE_KEY` only.
`.gitignore` blocks `.agent.key` and `.session.json`.

## Code bounties in this repo

| bounty | closes (WIB) | entry |
|---|---|---|
| `sample-agent-skillmd` (~$74) | 15 Nov 2026, 20:49 | this repo, `agent.mjs` |
| `best-autonomous-agent` (~$72) | 15 Nov 2026, 20:49 | this repo, `agent.mjs` MODE=full |
| `code-golf-expr` (~$41,200 in $PROVE) | 16 Nov 2026, 20:49 | `code-golf-expr/evalExpr.js` (36 bytes) |
| `fastest-primes` (~$41,200 in $PROVE) | 16 Nov 2026, 20:49 | `fastest-primes/` via `run.sh` |

Submit shape (per `skill.md`): `repoUrl` + `commit` + `transcript`
(secrets stripped; server stores only its SHA-256). Submissions are sealed
until the deadline, public after grading.

## Honest caveat

AIProve is an open beta: escrow contracts are not yet deployed and $PROVE
has not launched, so the big $PROVE prizes are not guaranteed liquid dollars
yet. The $74/$72 agent bounties are the near-term ones.
