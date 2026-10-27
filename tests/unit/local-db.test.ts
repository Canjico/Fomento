import { describe, expect, it } from "vitest";
import { parseDbConfig } from "@/shared/config/local-db";

const base = { DB_HOST: "127.0.0.1", DB_PORT: "54329", DB_TEST_PORT: "54330", DB_NAME: "fomento_dev", DB_TEST_NAME: "fomento_test", DB_USER: "fomento_local", DB_PASSWORD: "local-only-secret-123" };

describe("parseDbConfig", () => {
  it("aceita os dois bancos isolados", () => {
    expect(parseDbConfig(base).name).toBe("fomento_dev");
    expect(parseDbConfig(base, "test").name).toBe("fomento_test");
  });
  it("recusa DB externo", () => expect(() => parseDbConfig({ ...base, DB_HOST: "db.cloud.test" })).toThrow());
  it("recusa bancos idênticos", () => expect(() => parseDbConfig({ ...base, DB_TEST_NAME: base.DB_NAME })).toThrow());
  it("recusa credencial vazia", () => expect(() => parseDbConfig({ ...base, DB_PASSWORD: "" })).toThrow());
});
