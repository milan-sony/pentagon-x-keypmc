import { expect, test, type Page } from "@playwright/test";

const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024;

test.describe("homepage", () => {
  test("renders without console errors or horizontal overflow", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("We protect your investment");

    // Scroll through the page so lazy images and in-view animations run.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(50);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test("every image has loaded and carries alt text", async ({ page }) => {
    await page.goto("/");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(80);
    }
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        // Images inside display:none containers (desktop-only previews) are never fetched.
        .filter((img) => img.getClientRects().length > 0)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    );
    expect(broken).toEqual([]);
    const missingAlt = await page.locator("img:not([alt])").count();
    expect(missingAlt).toBe(0);
  });

  test("navigation scrolls to the services section", async ({ page }) => {
    await page.goto("/");
    if (isNarrow(page)) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("dialog").getByRole("link", { name: "Services" }).click();
      await expect(page.getByRole("dialog")).toBeHidden();
    } else {
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Services" }).click();
    }
    await expect(page.getByRole("heading", { name: "Integrated capabilities across the project life cycle." })).toBeInViewport();
  });

  test("the enquiry form explains missing fields", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Enter your name.")).toBeVisible();
    await expect(page.getByText("Enter a valid email address, like name@company.com.")).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeFocused();
  });

  test("content is fully visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "Projects in delivery across the UAE." })).toBeVisible();
    await expect(page.getByText("Al Bateen Executive Airport – Fuel Farm Relocation")).toBeVisible();
  });
});
