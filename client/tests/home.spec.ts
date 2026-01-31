import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Buzz Flickr/);
  });
  test("has searchbar", async ({ page }) => {
    await expect(page.getByRole("search")).toBeVisible();
  });
  test("initial page load shows recent feeds", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const previewPane = await page.getByLabel("preview-pane");
    const cardsCount = await previewPane.getByLabel("preview-card").count();

    expect(cardsCount).toBeGreaterThan(0);
  });
  test("search updates browser url", async ({ page }) => {
    await page.getByRole("search", { name: "Search..." }).fill("cat");
    await page.getByRole("button", { name: "search-icon" }).click();

    const want = "?q=cat";
    const got = new URL(page.url());

    expect(want).toEqual(got.search);

    await page.getByRole("search", { name: "Search..." }).fill("cat, funny");

    const want2 = "?q=cat%2C+funny";
    const got2 = new URL(page.url());

    expect(want2).toEqual(got2.search);
  });

  test("entering multiple tags shows search mode", async ({ page }) => {
    await page.getByRole("search", { name: "Search..." }).fill("cat, funny");
    await page.getByRole("button", { name: "search-icon" }).click();
    await expect(
      page.getByRole("radiogroup", { name: "search-mode" }),
    ).toBeVisible();
  });

  test("shows higher res when clicking on the card", async ({ page }) => {
    await page.getByRole("search", { name: "Search..." }).fill("funny");
    await page.getByRole("button", { name: "search-icon" }).click();

    await page
      .getByLabel("preview-card")
      .first()
      .getByLabel("preview-image")
      .click();
    expect(page.getByLabel("higher-res-image")).toBeVisible();
  });
});
