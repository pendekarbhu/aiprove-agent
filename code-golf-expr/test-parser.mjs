import { evalExpr } from './parser.js';
const cases = [
  ["1+2", 3], ["1+2*3", 7], ["(1+2)*3", 9], ["10/4", 2.5],
  ["2.5*4", 10], ["-3+5", 2], ["((2+3)*4)/2", 10], ["1-2-3", -4],
  ["8/4/2", 1], ["3.5+2.5", 6], [" 1 + 2 ", 3], ["2*(3+4)-5/2", 11.5],
  ["100/10/2", 5], ["5*-3", -15], ["-(2+3)", -5], ["7", 7],
  ["1.5+1.5*2", 4.5], ["((1))", 1], ["10-2*3+1", 5], ["0.5*0.5", 0.25],
  [".5+.5", 1], ["2+3*4-8/2", 10], ["(2+3)*(4-1)", 15], ["-2.5*2", -5],
];
let fail = 0;
for (const [s, want] of cases) {
  let got; try { got = evalExpr(s); } catch (e) { got = "ERR " + e.message; }
  const ok = typeof got === 'number' && Math.abs(got - want) < 1e-9;
  if (!ok) { fail++; console.log("FAIL", JSON.stringify(s), "got", got, "want", want); }
}
console.log(fail === 0 ? `ALL ${cases.length} CASES PASS` : `${fail} FAILURES`);
