import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: { include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"], environment: "node", passWithNoTests: false },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
