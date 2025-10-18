import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class HomePage {
  constructor(page) {
    this.page = page;

    this.homeButtonOne = page.locator('[data-id="3e57be1"]');
    this.homeButtonTwo = page.getByRole("link", { name: /Početna|Home/ });
    this.programsButtonOne = page.getByRole("link", { name: /Programi|Programs/ });
    this.programsButtonTwo = page.getByRole("link", { name: /PROGRAMS →|PROGRAMI →/ });
    this.programsButtonThree = page.getByRole("link", { name: /POGLEDAJ PROGRAME|CHOOSE PROGRAM|Odaberi Program/ });
    this.blogLinks = page.locator(".sc_blogger_item .link");
    this.nextSlideButton = page.locator('#home-all-programs_sc_swiper [aria-label="Next slide"]');
    this.prevSlideButton = page.locator('#home-all-programs_sc_swiper [aria-label="Previous slide"]');
    this.programPicture2 = page.getByLabel("2 /").getByRole("link").filter({ hasText: /^$/ });
    this.chooseProgramButton = page.getByRole("link", { name: "Odaberi Program 🔥" });
    this.burgerButton = page.locator(".sc_layouts_menu_mobile_button a");
    this.mobHomeButton = page.getByRole("link", { name: "Početna Str." });
  }

  gotoHomePage = async () => {
    await this.homeButtonOne.waitFor();
    await this.homeButtonOne.click();
  };
  gotoHomePageTabs = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.mobHomeButton.waitFor({ state: "visible" });
      await this.mobHomeButton.click();
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.chooseProgramButton.waitFor({ state: "visible" });
      await this.chooseProgramButton.click();
    }
    if (isDesktopViewport(this.page)) {
      await this.programsButtonTwo.waitFor({ state: "visible" });
      await this.programsButtonTwo.click();
      await this.homeButtonTwo.waitFor({ state: "visible" });
      await this.homeButtonTwo.click();
      await this.programsButtonOne.waitFor({ state: "visible" });
      await this.programsButtonOne.click();
    }
    await this.homeButtonOne.waitFor({ state: "visible" });
    await this.homeButtonOne.click();

    await this.programsButtonThree.waitFor({ state: "visible" });
    await this.programsButtonThree.click();
  };
  gotoBlogLinksFromHomePage = async () => {
    const blogCount = await this.blogLinks.count();
    const linksToTest = Math.min(blogCount, 2);
    for (let i = 0; i < linksToTest; i++) {
      await this.blogLinks.nth(i).waitFor({ state: "visible" });
      await this.blogLinks.nth(i).click();
      await expect(this.page).not.toHaveURL("/");
      await expect(this.page.locator("body")).toBeVisible();
      await this.page.goBack();
      await this.page.waitForLoadState("domcontentloaded");
    }
  };
  // gotoBlogLinksFromHomePage = async () => {
  //   const blogCount = await this.blogLinks.count();
  //   const linksToTest = Math.min(blogCount, 1); // 👈 SAMO 1 ZA POČETAK

  //   for (let i = 0; i < linksToTest; i++) {
  //     const blogLink = this.blogLinks.nth(i);

  //     await blogLink.waitFor({ state: "visible" });
  //     await this.page.waitForTimeout(2000); // 👈 DUŽE ČEKANJE

  //     // DIREKTAN KLIK PREKO ELEMENT HANDLE
  //     const elementHandle = await blogLink.elementHandle();
  //     await elementHandle.click();

  //     await expect(this.page).not.toHaveURL("/");
  //     await expect(this.page.locator("body")).toBeVisible();
  //     await this.page.goBack();
  //     await this.page.waitForLoadState("domcontentloaded");
  //   }
  // };

  testSliderNavigation = async () => {
    await this.nextSlideButton.waitFor({ state: "visible" });

    for (let i = 0; i < 2; i++) {
      if (await this.nextSlideButton.isEnabled()) {
        await this.nextSlideButton.click();
        await this.page.waitForTimeout(1500);
      }
    }
    await this.prevSlideButton.click();
  };
  clickRandomProgram = async () => {
    const programLinks = this.page.locator(".sc_services_item_link");
    const programCount = await programLinks.count();
    const randomIndex = Math.floor(Math.random() * programCount);
    await this.page.waitForTimeout(2000);
    const selectedProgram = programLinks.nth(randomIndex);
    await selectedProgram.evaluate((element) => {
      element.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
    });
    await this.page.evaluate(() => window.scrollBy(0, -100));
    await this.page.waitForTimeout(500);
    await selectedProgram.click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).not.toHaveURL("/services/");
    await expect(this.page.locator("body")).toBeVisible();
  };
}
