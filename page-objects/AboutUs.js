import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";
export class AboutUs {
  constructor(page) {
    this.page = page;

    this.aboutLink = page.getByRole("link", { name: /O Nama|About Us/ });
    this.findOutMoreButton = page.locator(".sc_button", { hasText: /SAZNAJTE VIŠE|FIND OUT MORE/ });
    this.allQuestionsButton = page.locator(".sc_button", { hasText: /SVA PITANJA|ALL QUESTIONS/ });
    this.topNextButton = page.locator(".slider_next.slider_arrow_default.swiper-button-next");
    this.topPrevButton = page.locator(".slider_prev.slider_arrow_default.swiper-button-prev");
    this.aboutUsQuestion = page.locator(".elementor-toggle-item .elementor-toggle-title");
    this.burgerButton = page.locator(".sc_layouts_menu_mobile_button a");
    this.mobAboutUsButton = page.locator("#mobile-menu-item-26154 a");
    this.mobFAQButton = page.locator("#mobile-menu-item-24884 a");
  }

  goToAboutUs = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.mobAboutUsButton.waitFor({ state: "visible" });
      await this.mobAboutUsButton.click();
      return;
    } else {
      await this.aboutLink.waitFor({ state: "visible" });
      await this.aboutLink.click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  };

  assertOnAboutUsPage = async () => {
    await expect(this.page).toHaveURL(/.*(o-nama|about-us).*/, { timeout: 10000 });
    await expect(this.page.locator("body")).toBeVisible();
  };

  clickFindOutMore = async () => {
    await this.findOutMoreButton.click();
  };

  testSwiperNavigationTop = async () => {
    await this.topNextButton.click();
    await this.page.waitForTimeout(1000);
    await this.topPrevButton.click();
    await this.page.waitForTimeout(1000);
  };
  testRandomAboutUs = async () => {
    const aboutUsCount = await this.aboutUsQuestion.count();

    const randomIndexes = [];
    while (randomIndexes.length < 3 && randomIndexes.length < aboutUsCount) {
      const randomIndex = Math.floor(Math.random() * aboutUsCount);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    for (const index of randomIndexes) {
      const question = this.aboutUsQuestion.nth(index);

      await question.click();
      await this.page.waitForTimeout(500);

      await question.click();
      await this.page.waitForTimeout(500);
    }
  };
  openRandomAboutUs = async () => {
    const aboutUsCount = await this.aboutUsQuestion.count();

    const randomIndexes = [];
    while (randomIndexes.length < 3 && randomIndexes.length < aboutUsCount) {
      const randomIndex = Math.floor(Math.random() * aboutUsCount);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    for (const index of randomIndexes) {
      await this.aboutUsQuestion.nth(index).click();
      await this.page.waitForTimeout(300);
    }
  };

  goToFAQFromAboutUs = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.mobFAQButton.waitFor({ state: "visible" });
      await this.mobFAQButton.click();
      return;
    } else {
      await this.allQuestionsButton.click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  };
}
