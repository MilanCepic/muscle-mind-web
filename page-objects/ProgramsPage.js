import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";
export class ProgramsPage {
  constructor(page) {
    this.page = page;

    this.programsButtonTwo = page.locator(".sc_button_default.sc_button_size_small");
    this.genderToggle = page.locator(".sc_switcher_controls_toggle");

    this.allTrainingsButtonMan = page.getByRole("button", { name: /SVI MUŠKI|ALL MAN/i });
    this.allTrainingsButtonWoman = page.getByRole("button", { name: /SVI ŽENSKI|ALL WOMAN/i });

    this.threeTimesWeekButton = page.locator("div:nth-child(2) > .sc_switcher_tab_link").first();
    this.fourTimesWeekButton = page.locator("div:nth-child(3) > .sc_switcher_tab_link").first();
    this.fiveTimesWeekButton = page.locator("div:nth-child(4) > .sc_switcher_tab_link").first();

    this.trainingCards = page.locator(".swiper-slide:not(.swiper-slide-duplicate)");
    this.trainingCardNames = page.locator(".training-card .name");

    this.fullBody3xCardF = page.locator('[data-post-id="25339"]').nth(1);
    this.fullBody4xCardF = page.locator('[data-post-id="25340"]').nth(1);
    this.fullBody5xCardF = page.locator('[data-post-id="25341"]').nth(1);
    this.femaleTrainingCards = page.locator(".cpt_services_group-zene");

    this.threeXPrograms = page.locator("#three-man").getByRole("link").filter({ hasText: /^$/ }).first();
    this.fourXPrograms = page.locator("#four-man").getByRole("link").filter({ hasText: /^$/ }).first();
    this.fiveXPrograms = page.locator("#five-man").getByRole("link").nth(1);

    this.allVisiblePrograms = page.locator(".sc_services_item:visible");
  }

  goToProgramsPage = async () => {
    await this.programsButtonTwo.waitFor({ state: "visible" });
    await this.programsButtonTwo.click();
    await expect(this.page).toHaveURL(/.*(programi| en\/programs).*/, { timeout: 10000 });
  };

  toggleGender = async () => {
    await this.genderToggle.waitFor({ state: "visible" });
    await this.genderToggle.click();
    await this.page.waitForTimeout(1000);
  };

  areFemaleProgramsVisible = async () => {
    await expect(this.fullBody3xCardF).toBeVisible();
    await expect(this.fullBody4xCardF).toBeVisible();
    await expect(this.fullBody5xCardF).toBeVisible();
  };

  selectFemaleRandomProgram = async () => {
    await this.page.waitForTimeout(2000);

    const femaleTrainingCardLinks = this.page.locator(".cpt_services_group-zene .sc_services_item_link");
    const programCount = await femaleTrainingCardLinks.count();

    const randomIndex = Math.floor(Math.random() * programCount);
    const selectedCardLink = femaleTrainingCardLinks.nth(randomIndex);

    await selectedCardLink.scrollIntoViewIfNeeded();
    await expect(selectedCardLink).toBeVisible();
    await selectedCardLink.scrollIntoViewIfNeeded();
    await selectedCardLink.click({ force: true });

    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(/.*\/services\/.*/, { timeout: 10000 });

    await this.page.goBack();
    await this.page.waitForLoadState("domcontentloaded");

    return `Ženski program ${randomIndex + 1}`;
  };
  clickNumberedTrainingButton = async () => {
    await this.threeTimesWeekButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.threeXPrograms.first()).toBeVisible();

    await this.fourTimesWeekButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.fourXPrograms.first()).toBeVisible();

    await this.fiveTimesWeekButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.fiveXPrograms.first()).toBeVisible();
  };

  testAllPrograms = async () => {
    await this.toggleGender();
    await this.areFemaleProgramsVisible();
    await this.selectFemaleRandomProgram();
    await this.clickNumberedTrainingButton();
  };
}
