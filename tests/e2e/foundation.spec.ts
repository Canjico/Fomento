import { expect, test } from "@playwright/test";

test("página técnica carrega e não simula funcionalidades futuras", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("link", { name: "Fomentoria, início" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Nenhum edital");
  await expect(page.getByRole("link", { name: /inscrever|checkout|administrar/i })).toHaveCount(0);
});

test("viewport mobile mantém o marco técnico legível", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Fomentoria, início" })).toBeInViewport();
});

test("rotas administrativas e login não estão disponíveis no Bloco A", async ({ request }) => {
  for (const route of ["/admin", "/api/admin", "/login"]) {
    const response = await request.get(route);
    expect(response.status(), `${route} deve retornar 404`).toBe(404);
  }
});
