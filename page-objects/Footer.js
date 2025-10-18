import { expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class Footer {
  constructor(page) {
    this.page = page;

    this.youtubeIcon = page.getByRole("link", { name: "Youtube" });
    this.instagramIcon = page.getByRole("link", { name: "Instagram" });
    this.facebookIcon = page.getByRole("link", { name: "Facebook" });
    this.tiktokIcon = page.getByRole("link", { name: "Tik-tok" });
    this.newsletterEmailInput = page.locator("#form-field-name");
    this.newsletterSubmitButton = page.getByRole("button", { name: /SEND|POŠALJI/ });
    this.footerSection = page.locator('[data-id="9f5dd93"]');
    this.scrollToTopButton = page.locator('[title="Scroll to top"]');
    this.successMessage = page.locator('.elementor-message.elementor-message-success[role="alert"]');
  }

  scrollToFooter = async () => {
    await this.footerSection.waitFor();
    await this.footerSection.scrollIntoViewIfNeeded();
  };
  openSocialLink = async (socialIcon, expectedUrl) => {
    await socialIcon.waitFor();
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), socialIcon.click()]);

    //await newTab.waitForLoadState("domcontentloaded");
    expect(newTab.url()).toContain(expectedUrl);
    await newTab.close();
  };
  goToYouTube = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.openSocialLink(this.youtubeIcon, "https://m.youtube.com/@steva_rl13");
    } else {
      await this.openSocialLink(this.youtubeIcon, "https://www.youtube.com/@steva_rl13");
    }
  };

  goToInstagram = async () => {
    await this.openSocialLink(this.instagramIcon, "https://www.instagram.com/musclemindapp/");
  };

  // goToFacebook = async () => {
  //   if (!isDesktopViewport(this.page)) {
  //     await this.openSocialLink(this.facebookIcon, "https://m.facebook.com/61568093668763/");
  //   } else {
  //     await this.openSocialLink(this.facebookIcon, "https://www.facebook.com/people/MuscleMind-Va%C5%A1-Li%C4%8Dni-Trener/61568093668763/");
  //   }
  // };

  goToFacebook = async () => {
    await this.openSocialLink(this.facebookIcon, "facebook.com");
  };

  goToTikTok = async () => {
    await this.openSocialLink(this.tiktokIcon, "https://www.tiktok.com/@musclemindapp");
  };

  testNewsletterValidation = async () => {
    await this.scrollToFooter();

    await this.newsletterEmailInput.waitFor();
    await this.newsletterEmailInput.fill("");
    await this.newsletterSubmitButton.waitFor();
    await this.newsletterSubmitButton.click();

    await expect(this.newsletterEmailInput).toHaveJSProperty("validity.valid", false);
    const validationMessage = await this.newsletterEmailInput.evaluate((el) => el.validationMessage);
    expect(validationMessage).toContain("Please fill out this field");
  };

  subscribeToNewsletter = async () => {
    await this.newsletterEmailInput.waitFor();
    const email = uuidv4() + "@gmail.com";
    await this.newsletterEmailInput.fill(email);
    await this.newsletterSubmitButton.waitFor();
    await this.newsletterSubmitButton.click();
    await this.successMessage.waitFor();
  };
  scroollToTop = async () => {
    await this.scrollToTopButton.waitFor();
    await this.scrollToTopButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.locator("body")).toBeVisible();
  };
  testAllFooter = async () => {
    await this.scrollToFooter();
    await this.goToYouTube();
    await this.goToInstagram();
    await this.goToFacebook();
    await this.goToTikTok();
    await this.testNewsletterValidation();
    await this.subscribeToNewsletter();
    await this.scroollToTop();
  };
}
