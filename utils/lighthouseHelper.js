// utils/lighthouse-helper.js
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export class LighthouseHelper {
  static async runAudit(page, url, thresholds = {}) {
    const chrome = await launch({
      chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
    });

    const options = {
      logLevel: "info",
      output: "html",
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
      port: chrome.port,
    };

    try {
      console.log(`🚀 Running Lighthouse audit for: ${url}`);

      const runnerResult = await lighthouse(url, options);
      const { lhr } = runnerResult;

      // Sačuvaj report
      this.saveReport(runnerResult.report, url);

      // Proveri threshold-e
      const results = this.checkThresholds(lhr, thresholds);

      await chrome.kill();
      return results;
    } catch (error) {
      await chrome.kill();
      throw error;
    }
  }

  static checkThresholds(lhr, thresholds) {
    const results = {};
    const defaultThresholds = {
      performance: 70,
      accessibility: 85,
      "best-practices": 80,
      seo: 80,
    };

    const finalThresholds = { ...defaultThresholds, ...thresholds };

    for (const [category, threshold] of Object.entries(finalThresholds)) {
      const score = lhr.categories[category]?.score * 100;
      results[category] = {
        score: score || 0,
        threshold: threshold,
        passed: (score || 0) >= threshold,
      };

      console.log(`📊 ${category.toUpperCase()}: ${score}% (Threshold: ${threshold}%) - ${results[category].passed ? "✅ PASS" : "❌ FAIL"}`);
    }

    return results;
  }

  static saveReport(report, url) {
    const reportsDir = join(process.cwd(), "lighthouse-reports");

    if (!existsSync(reportsDir)) {
      mkdirSync(reportsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const domain = new URL(url).hostname;
    const filename = `lighthouse-${domain}-${timestamp}.html`;
    const filepath = join(reportsDir, filename);

    writeFileSync(filepath, report);
    console.log(`📄 Lighthouse report saved: ${filepath}`);
  }
}
