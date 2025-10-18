import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport";
export class FAQ {
  constructor(page) {
    this.page = page;

    this.faqLink = page.getByRole("link", { name: /FAQ|FAQs/ });
    this.videoElement = page.locator("video.elementor-video");
    this.faqQuestions = page.locator(".elementor-toggle-title, .elementor-accordion-item, [data-faq-item]");
    this.burgerButton = page.locator(".sc_layouts_menu_mobile_button a");
    this.mobFAQButton = page.locator("#mobile-menu-item-24884 a");
  }

  goToFAQ = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.mobFAQButton.waitFor({ state: "visible" });
      await this.mobFAQButton.click();
    } else {
      await this.faqLink.waitFor({ state: "visible" });
      await this.faqLink.click();
    }
    await this.page.waitForURL(/(\/faq|\/faqs)/, { timeout: 15000 });
  };
  assertOnFAQPage = async () => {
    await expect(this.page).toHaveURL(/(\/faq|\/faqs)/, { timeout: 10000 });
    await expect(this.page.locator("body")).toBeVisible();
    await expect(this.videoElement).toBeVisible();
  };
  testRandomFAQs = async () => {
    const faqCount = await this.faqQuestions.count();

    if (faqCount === 0) {
      throw new Error("Nema FAQ pitanja na stranici");
    }

    const randomIndexes = [];
    while (randomIndexes.length < 3 && randomIndexes.length < faqCount) {
      const randomIndex = Math.floor(Math.random() * faqCount);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    for (const index of randomIndexes) {
      const question = this.faqQuestions.nth(index);

      await question.click();
      await this.page.waitForTimeout(500);

      await question.click();
      await this.page.waitForTimeout(500);
    }
  };

  openRandomFAQs = async () => {
    const faqCount = await this.faqQuestions.count();

    const randomIndexes = [];
    while (randomIndexes.length < 3 && randomIndexes.length < faqCount) {
      const randomIndex = Math.floor(Math.random() * faqCount);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    for (const index of randomIndexes) {
      await this.faqQuestions.nth(index).click();
      await this.page.waitForTimeout(300);
    }
  };
}
