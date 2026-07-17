import { expect, test } from "@playwright/test";

test("team member can review and approve an agent action", async ({ page }) => {
  await page.goto("/workspace/meridian-demo");
  await expect(page.getByRole("heading", { name: "Launch readiness" })).toBeVisible();
  await page.getByRole("button", { name: "Approve send revised timeline" }).click();
  await expect(page.getByText("Approved by you")).toBeVisible();
});
