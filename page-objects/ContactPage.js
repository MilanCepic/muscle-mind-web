import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class ContactPage {
  constructor(page) {
    this.page = page;

    this.contactButton = page.getByRole("link", { name: /Kontakt|Contact/ });
    this.marketingButton = page.locator(".link_text", { hasText: /Contact marketing|K.?ktantirajte Marketing/ });
    this.supportButton = page.getByText(/Kontaktirajte Podršku|Contact support/);
    this.carrersButton = page.getByText(/Pridružite se Timu|Join the team/);
    this.burgerButton = page.locator(".sc_layouts_menu_mobile_button a");
  }

  goToContact = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
    }
    await this.contactButton.waitFor({ state: "visible" });
    await this.contactButton.click();
  };
  assertOnContactPage = async () => {
    await expect(this.page).toHaveURL(/\/kontakt\/|\/en\/contact\//);
  };
  clickMarketingTab = async () => {
    await this.marketingButton.waitFor();
    await this.marketingButton.click();
  };

  clickSupportTab = async () => {
    await this.supportButton.waitFor();
    await this.supportButton.scrollIntoViewIfNeeded();
    await this.supportButton.click();
  };
  clickCarrersTab = async () => {
    await this.carrersButton.waitFor();
    await this.carrersButton.scrollIntoViewIfNeeded();
    await this.carrersButton.click();
  };
}
