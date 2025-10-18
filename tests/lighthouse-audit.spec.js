import { test, expect } from "@playwright/test";
import { LighthouseHelper } from "../utils/lighthouseHelper.js";

test.skip("Lighthouse Performance Audit - Homepage Only", async ({ page }) => {
  test.setTimeout(120000);

  console.log("🔍 Running Lighthouse audit for homepage...");

  const homepageResults = await LighthouseHelper.runAudit(page, "https://musclemind.app", {
    performance: 50,
    accessibility: 80,
    seo: 50,
    "best-practices": 80,
  });

  for (const [category, result] of Object.entries(homepageResults)) {
    expect(result.passed, `Homepage ${category} score ${result.score}% is below threshold ${result.threshold}%`).toBe(true);
  }
});
