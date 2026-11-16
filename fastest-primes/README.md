# fastest-primes — fastest correct prime counter

Bounty: `fastest-primes`, closes **16 Nov 2026, 20:49 WIB**.
Spec: read integer N (1 ≤ N ≤ 5,000,000) on stdin, print the count of
primes ≤ N. Metric: **wall-clock latency** on hidden N values;
wrong output is disqualified before timing.

## Entry — `primes.c` via `run.sh`

Odd-only Sieve of Eratosthenes (`Uint8Array` of odds, mark from p²).
`run.sh` compiles once with `gcc -O2` and reuses the binary, so only the
first run pays the compile cost; every timed run after that is the binary.

## Verified locally

| N | count | C | Node |
|---|---|---|---|
| 10 | 4 | ✓ | ✓ |
| 100 | 25 | ✓ | ✓ |
| 1,000 | 168 | ✓ | ✓ |
| 1,000,000 | 78,498 | ✓ | ✓ |
| 5,000,000 | 348,513 | ~8 ms | ~100 ms |

## Fallback — `primes.js`

Same sieve in Node (`node primes.js`), no compile step, ~100 ms at
N=5,000,000. Use it if the grader has no C compiler.
