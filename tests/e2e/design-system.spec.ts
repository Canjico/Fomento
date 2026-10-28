import { expect, test } from "@playwright/test";

test("navegação acessível e links ancorados em seções reais", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Pular para o conteúdo" })).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Como funciona" })).toHaveAttribute("href", "/#como-funciona");
  await expect(page.locator("#como-funciona")).toHaveCount(1);
  await expect(page.getByRole("status")).toContainText("Nenhum edital");
});

test("viewport mobile não tem scroll horizontal e menu é operável", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.locator(".mobile-menu summary").click();
  await expect(page.getByRole("navigation", { name: "Menu para dispositivos móveis" }).getByRole("link", { name: "Como funciona" })).toBeVisible();
});

test("pares semânticos de texto cumprem contraste WCAG AA", async ({ page }) => {
  await page.goto("/");
  const contrast = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    const getColor = (name: string) => {
      // CSS optimization may shorten #ffffff to #fff in browser styles.
      const raw = style.getPropertyValue(name).trim();
      const value = raw.replace(/^#/, "");
      let hex: string;
      if (/^[0-9a-f]{3}$/i.test(value)) {
        hex = [...value].map((digit) => digit + digit).join("");
      } else if (/^[0-9a-f]{6}$/i.test(value)) {
        hex = value;
      } else {
        throw new Error(`Token ${name} tem cor inesperada: ${JSON.stringify(raw)}`);
      }
      const channels = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
      return channels.map((n) => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4)
        .reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
    };
    const ratio = (front: string, back: string) => {
      const a = getColor(front), b = getColor(back);
      return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    };
    return {
      inkPaper: ratio("--f-color-ink", "--f-color-paper"),
      navyPaper: ratio("--f-color-navy", "--f-color-paper"),
      forestPaper: ratio("--f-color-forest", "--f-color-paper"),
      inkSky: ratio("--f-color-ink", "--f-color-sky"),
      inkCoral: ratio("--f-color-ink", "--f-color-coral"),
    };
  });
  for (const [pair, ratio] of Object.entries(contrast)) {
    expect(ratio, `${pair} abaixo de 4.5:1`).toBeGreaterThanOrEqual(4.5);
  }
  await expect(page.getByRole("link", { name: /Conheça a proposta/ })).toBeVisible();
});

test("Bloco B não expõe painel administrativo ou login", async ({ request }) => {
  for (const path of ["/admin", "/api/admin", "/login"]) {
    const result = await request.get(path);
    expect(result.status(), `${path} deve seguir indisponível`).toBe(404);
  }
});

test("layout sem rolagem lateral em 320, 375, 768 e 1280 px, com evidências visuais", async ({ page }, testInfo) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect.poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
    ).toBe(true);
    await testInfo.attach(`interface-${width}px`, {
      body: await page.screenshot({ fullPage: true, animations: "disabled" }),
      contentType: "image/png",
    });
  }
});
