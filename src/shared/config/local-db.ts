/** Configuração pura: sem IO, sem segredo em logs, somente infraestrutura. */
export type LocalDbConfig = Readonly<{
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}>;

const NAME = /^[a-zA-Z][a-zA-Z0-9_]{0,62}$/;

export function parseDbConfig(values: Record<string, string | undefined>, database: "dev" | "test" = "dev"): LocalDbConfig {
  const host = values.DB_HOST?.trim();
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("DB_HOST deve ser localhost ou 127.0.0.1 na fundação local");
  }
  const port = Number(database === "test" ? values.DB_TEST_PORT : values.DB_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("DB_PORT inválida");
  const name = (database === "test" ? values.DB_TEST_NAME : values.DB_NAME)?.trim();
  if (!name || !NAME.test(name)) throw new Error("Nome do banco inválido");
  const user = values.DB_USER?.trim();
  if (!user || !NAME.test(user)) throw new Error("Usuário do banco inválido");
  const password = values.DB_PASSWORD;
  if (!password || password.length < 12 || ["password", "change-me-local-only"].includes(password)) throw new Error("DB_PASSWORD ausente ou fraca");
  if (values.DB_PORT && values.DB_TEST_PORT && values.DB_PORT === values.DB_TEST_PORT) throw new Error("Portas de teste e dev devem ser diferentes");
  if (values.DB_NAME && values.DB_TEST_NAME && values.DB_NAME === values.DB_TEST_NAME) {
    throw new Error("Banco de teste deve ser diferente do banco de desenvolvimento");
  }
  return { host, port, name, user, password };
}
