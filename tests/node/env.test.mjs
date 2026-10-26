import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadAndValidateEnv } from "../../scripts/check-env.mjs";

const sample = "DB_HOST=127.0.0.1\nDB_PORT=54329\nDB_TEST_PORT=54330\nDB_USER=fomento_local\nDB_NAME=fomento_dev\nDB_TEST_NAME=fomento_test\nDB_PASSWORD=local-only-secret-123\n";
function fixture(content) { const dir = mkdtempSync(join(tmpdir(), "fomento-env-")); const file = join(dir, ".env"); writeFileSync(file, content); return { dir, file }; }

test("validação offline do ambiente local", () => {
  const { dir, file } = fixture(sample);
  try { const env = loadAndValidateEnv(file); assert.equal(env.DB_HOST, "127.0.0.1"); assert.equal(env.DB_NAME, "fomento_dev"); }
  finally { rmSync(dir, { recursive: true, force: true }); }
});

test("rejeita host externo", () => {
  const { dir, file } = fixture(sample.replace("127.0.0.1", "db.example.com"));
  try { assert.throws(() => loadAndValidateEnv(file), /localhost/); }
  finally { rmSync(dir, { recursive: true, force: true }); }
});
