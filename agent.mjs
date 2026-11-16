// sample-agent — a minimal autonomous AIProve agent.
// Reads the skill.md flow: authenticate with its own keypair, list open
// bounties, enter one (MODE=sample) or every safe one (MODE=full).
// No private key lives in this repo: set AGENT_PRIVATE_KEY in env.
//   AGENT_PRIVATE_KEY=0x... AGENT_HANDLE=pendekarbhu MODE=sample node agent.mjs
//   MODE=full node agent.mjs            # enter all safe open bounties
//   DRY_RUN=1 node agent.mjs           # auth + list only, enters nothing
import { Wallet } from "ethers";

const API = process.env.API_BASE_URL || "https://aiprove.fun";
const handle = process.env.AGENT_HANDLE || "pendekarbhu";
const mode = process.env.MODE || "sample";
const dryRun = process.env.DRY_RUN === "1";

const pk = process.env.AGENT_PRIVATE_KEY;
if (!pk) { console.error("AGENT_PRIVATE_KEY env var required"); process.exit(1); }
const w = new Wallet(pk);

// Bounties this agent cannot do alone: X posts, video, code repos,
// gated (needs $PROVE stake) and the agent bounties themselves.
const SKIP = ["retweet", "post-on-x", "explainer-video", "code-golf",
  "fastest-primes", "sample-agent", "best-autonomous", "bughunt-stakepool",
  "marketing-prove-launch", "prove-mc-3d", "nvda-jensen-earnings"];
const safe = (b) => b.status === "open" && !SKIP.some((k) => b.slug.includes(k));

const ch = await (await fetch(`${API}/api/auth/challenge?address=${w.address}`)).json();
const sig = await w.signMessage(ch.challenge);
const auth = await (await fetch(`${API}/api/auth/verify`, {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ address: w.address, signature: sig }),
})).json();
if (!auth.token) { console.error("AUTH FAIL", auth); process.exit(1); }
const H = { Authorization: `Bearer ${auth.token}`, "content-type": "application/json" };
const post = async (path, body) => {
  const r = await fetch(`${API}${path}`, { method: "POST", headers: H, body: JSON.stringify(body || {}) });
  return { status: r.status, body: await r.json().catch(() => null) };
};

const { bounties = [] } = await (await fetch(`${API}/api/bounties?status=open`)).json();
const open = bounties.filter(safe);
const target = mode === "full" ? open : open.slice(0, 1);
const entered = [];
for (const b of target) {
  if (dryRun) { entered.push({ slug: b.slug, dryRun: true }); continue; }
  const res = await post(`/api/bounties/${b.slug}/enter`, { handle });
  entered.push({ slug: b.slug, status: res.status, ok: res.status < 300 });
}
console.log(JSON.stringify({ agent: w.address, handle, mode, dryRun,
  openSafe: open.length, entered, ts: new Date().toISOString() }, null, 2));
