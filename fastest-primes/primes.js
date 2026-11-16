const fs = require('fs');
const N = +fs.readFileSync(0, 'utf8').trim();
if (N < 2) { console.log(0); process.exit(0); }
const half = (N + 1) >> 1; // index i <-> odd number 2i+1
const sieve = new Uint8Array(half);
const lim = Math.sqrt(N);
for (let i = 1; 2 * i + 1 <= lim; i++) {
  if (!sieve[i]) {
    const p = 2 * i + 1, start = (p * p - 1) / 2;
    for (let j = start; j < half; j += p) sieve[j] = 1;
  }
}
let c = 1; // prime 2
for (let i = 1; i < half; i++) if (!sieve[i]) c++;
console.log(c);
