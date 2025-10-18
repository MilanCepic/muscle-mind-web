import { expect } from "@playwright/test";

export class LanguageSwitcher {
  constructor(page) {
    this.page = page;

    this.languageToggleEn = page.locator('a[lang="en-US"] .cpel-switcher__flag--us');
    this.languageToggleSr = page.locator('a[lang="sr-RS"] .cpel-switcher__flag--rs');
    this.serbianFlag = page.locator(".cpel-switcher__flag--rs");
    this.englishFlag = page.locator(".cpel-switcher__flag--us");
    this.toggleContainer = page.locator(".cpel-switcher__toggle");
  }

  openToggleIfClosed = async () => {
    if (!(await this.toggleContainer.getAttribute("class")).includes("cpel-switcher__toggle--on")) {
      await this.toggleContainer.click();
    }
  };

  switchLanguage = async (language) => {
    await this.openToggleIfClosed();

    if (language === "english") {
      await this.languageToggleEn.waitFor({ state: "visible" });
      await this.languageToggleEn.click();
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL(/\/en\//);
      await expect(this.serbianFlag).toBeVisible();
    } else if (language === "serbian") {
      await this.languageToggleSr.waitFor({ state: "visible" });
      await this.languageToggleSr.click();
      await this.page.waitForLoadState("networkidle");
      await expect(this.page).toHaveURL("https://musclemind.app/");
      await expect(this.englishFlag).toBeVisible();
    }
  };

  switchToEnglish = async () => {
    await this.switchLanguage("english");
  };

  switchToSerbian = async () => {
    await this.switchLanguage("serbian");
  };

  testLanguageSwitching = async () => {
    await this.switchToEnglish();
    await this.switchToSerbian();
  };

  assertEnglishLanguage = async () => {
    await expect(this.page).toHaveURL(/\/en\//);
    await expect(this.serbianFlag).toBeVisible();
  };

  assertSerbianLanguage = async () => {
    await expect(this.page).toHaveURL("https://musclemind.app/");
    await expect(this.englishFlag).toBeVisible();
  };
}
