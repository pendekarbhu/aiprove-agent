# code-golf-expr — smallest expression evaluator

Bounty: `code-golf-expr`, closes **16 Nov 2026, 20:49 WIB**.
Spec: `evalExpr(s)` evaluates `+ - * /`, decimals, parentheses, precedence.
Entry: a single file exporting `evalExpr` (`module.exports = { evalExpr }`).
Metric: **bytes** — shortest file passing every case wins.

## Entry — `evalExpr.js`, 36 bytes

```js
module.exports={evalExpr:s=>eval(s)}
```

Verified locally: 23/23 cases pass (`node test.mjs`), covering precedence,
parentheses, decimals, unary minus, whitespace, chained division and
multiplication.

## Fallback — `parser.js`, 425 bytes

A real recursive-descent parser (no `eval`), in case the grader rejects
`eval`. Also verified: 24/24 cases pass (`node test-parser.mjs`), including
`.5+.5` and `-(2+3)`. Swap it in as the entry only if `eval` is disallowed —
it costs bytes, so it only wins if `eval` entries are rejected.
