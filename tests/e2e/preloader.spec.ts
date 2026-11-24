import { expect, test } from "@playwright/test";

test.describe("preloader", () => {
  test("plays on the first visit, then lifts to reveal the page", async ({ page }) => {
    await page.goto("/");
    const preloader = page.getByTestId("preloader");
    await expect(preloader).toBeVisible();
    await expect(preloader).toBeHidden({ timeout: 5_000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  });

  test("does not replay when the page is reloaded in the same session", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("preloader")).toBeHidden({ timeout: 5_000 });
    await page.reload();
    // Hidden from first paint by the head script, not removed after a delay.
    await expect(page.getByTestId("preloader")).toBeHidden({ timeout: 500 });
  });

  test("is skipped entirely when the visitor prefers reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByTestId("preloader")).toBeHidden({ timeout: 500 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("lets the page scroll once it has lifted", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("preloader")).toBeHidden({ timeout: 5_000 });
    await page.mouse.wheel(0, 1200);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  });
});
