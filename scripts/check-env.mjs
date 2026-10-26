import { existsSync, readFileSync } from "node:fs";
import { parseEnv } from "node:util";

export function loadAndValidateEnv(path = ".env") {
  if (!existsSync(path)) throw new Error("Arquivo .env ausente: copie .env.example e ajuste localmente");
  const { DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_TEST_NAME, DB_PASSWORD, DB_TEST_PORT } = parseEnv(readFileSync(path, "utf8"));
  if (!["localhost", "127.0.0.1"].includes(DB_HOST)) throw new Error("DB_HOST deve ser localhost");
  const port = Number(DB_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("DB_PORT inválida");
  const testPort = Number(DB_TEST_PORT);
  if (!Number.isInteger(testPort) || testPort < 1 || testPort > 65535 || testPort === port) throw new Error("DB_TEST_PORT inválida ou igual à de desenvolvimento");
  for (const [key, val] of Object.entries({ DB_USER, DB_NAME, DB_TEST_NAME })) {
    if (!val || !/^[a-zA-Z][a-zA-Z0-9_]{0,62}$/.test(val)) throw new Error(`${key} inválida`);
  }
  if (DB_NAME === DB_TEST_NAME) throw new Error("Bancos de dev e teste não podem coincidir");
  if (!DB_PASSWORD || DB_PASSWORD.length < 12 || ["password", "change-me-local-only"].includes(DB_PASSWORD)) throw new Error("DB_PASSWORD insegura");
  return { DB_HOST, DB_PORT: port, DB_TEST_PORT: testPort, DB_USER, DB_NAME, DB_TEST_NAME, DB_PASSWORD };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  try { loadAndValidateEnv(); console.log("Configuração local válida (sem exibir segredos)."); }
  catch (error) { console.error(`Configuração inválida: ${error instanceof Error ? error.message : "erro"}`); process.exitCode = 1; }
}
