import { Client } from "pg";
import { loadAndValidateEnv } from "./check-env.mjs";

let client;
try {
  const env = loadAndValidateEnv();
  const dbName = process.argv.includes("--test") ? env.DB_TEST_NAME : env.DB_NAME;
  client = new Client({ host: env.DB_HOST, port: process.argv.includes("--test") ? env.DB_TEST_PORT : env.DB_PORT, database: dbName, user: env.DB_USER, password: env.DB_PASSWORD, connectionTimeoutMillis: 4000, ssl: false });
  await client.connect();
  const result = await client.query("SELECT 1 AS ok");
  if (result.rows[0]?.ok !== 1) throw new Error("Banco não respondeu SELECT 1");
  console.log(`PostgreSQL local respondeu (db=${dbName}). Nenhuma migration de domínio.`);
} catch (error) {
  console.error(`Conectividade não validada: ${error instanceof Error ? error.message : "erro"}`);
  process.exitCode = 1;
} finally { await client?.end().catch(() => {}); }
