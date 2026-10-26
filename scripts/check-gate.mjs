import { readFileSync } from "node:fs";

const text = readFileSync("docs/bloco-0/11-TESTES-E-GATES.md", "utf8");
const lines = text.split(/\r?\n/);
// A tabela canônica começa sob um título explícito e termina no próximo cabeçalho.
const start = lines.findIndex((line) => line.startsWith("### R2 — Catálogo canônico, autoridade exclusiva"));
if (start < 0) throw new Error("Cabeçalho da tabela canônica ausente");
const section = lines.slice(start + 1).join("\n").split(/\n#### Mapeamento histórico/, 1)[0];
const cases = section.split("\n").filter((line) => /^\| `(?:EDT|TIM|AUTH|SRC|DED|ENT|BIL|PERF|PRIV|LOG)-\d+`/.test(line));
// A tabela R2 possui linhas canônicas EDT... e outros IDs de famílias.
const unique = new Set(cases.map((line) => line.match(/`([A-Z]+-\d+)`/)?.[1]));
if (cases.length !== 61 || unique.size !== 61) throw new Error(`IDs canônicos: encontrados ${cases.length}, distintos ${unique.size}; esperado 61`);
const matches = cases.filter((line) => line.startsWith("| `EDT-08`"));
if (matches.length !== 1) throw new Error("EDT-08 duplicado/ausente");
const cols = matches[0].split("|").map((x) => x.trim());
if (!cols[1]?.includes("Correção de PII em trilha") || cols[3] !== "G/V") throw new Error("Semântica/bloco EDT-08 mudou");
if (!cols.at(-2)?.endsWith("G/V") || cols.at(-2)?.endsWith("D/F")) throw new Error("Gate EDT-08 incorreto");
console.log("EDT-08: único, semântica preservada, G/V e sem exigência D/F; 61 casos normativos únicos.");
