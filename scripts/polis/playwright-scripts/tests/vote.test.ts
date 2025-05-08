import { test } from "@playwright/test";
import { transpose } from "./util";
import { data } from "./data";

// We use custom UI for voting (to fix order)
const URL = "https://localhost:3000/polis/tmp";

const vote_data = transpose(
  data
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => line.split("\t").map(Number))
);

vote_data.forEach((column, i) => {
  test(`test${i}`, async ({ page }) => {
    await page.goto(URL);
    for (const vote of column) {
      const name = vote === 1 ? "賛成" : vote === -1 ? "反対" : "どちらでも";
      console.log(name);
      await page.getByRole("button", { name }).click();
    }
  });
});
