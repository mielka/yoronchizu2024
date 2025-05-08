import { test, expect } from "@playwright/test";
import { title, comments } from "./data";

// Polis account info for admin
const TARGET_POLIS = "https://polis.example.com/";
const EMAIL = "conversation_admin@example.com";
const PASSWORD = "XXXXX";

test("test", async ({ page }) => {
  await page.goto(TARGET_POLIS + "home");
  await page.getByRole("link", { name: "Sign in" }).nth(1).click();
  await page.getByPlaceholder("email").click();
  await page.getByPlaceholder("email").fill(EMAIL);
  await page.getByPlaceholder("password").click();
  await page.getByPlaceholder("password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForURL(TARGET_POLIS);
  await page.getByRole("button", { name: "Create new conversation" }).click();
  await page.locator('[data-test-id="topic"]').fill(title);
  await page.locator('[data-test-id="vis_type"]').click();

  for (const comment of comments.trim().split("\n")) {
    const seed_comment_form = page.locator('[data-test-id="seed_form"]');
    console.log("comment:", comment);
    await seed_comment_form.fill(comment);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(seed_comment_form).toHaveValue("");
  }
  console.log(page.url());
});
