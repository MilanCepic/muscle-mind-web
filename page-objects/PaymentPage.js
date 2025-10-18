import { expect } from "@playwright/test";
import { cardDetails } from "../data/cardDetails.js";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";
export class PaymentPage {
  constructor(page) {
    this.page = page;

    this.promotionCodeInput = page.locator("#promotionCode");
    this.promotionCodeInputMobile = page.locator('[data-testid="order-details-mobile"] #promotionCode');
    this.applyPromotionButton = page.getByRole("button", { name: "Apply" });
    this.emailInput = page.locator("#email");
    this.cardNumberInput = page.locator("#cardNumber");
    this.cardExpiryInput = page.locator("#cardExpiry");
    this.cardCVCInput = page.locator("#cardCvc");
    this.billingNameInput = page.locator("#billingName");
    this.countryDropdown = page.locator("#billingCountry");
    this.saveInfoCheckbox = page.locator(".Checkbox-Input");
    this.phoneInput = page.locator("#phoneNumber");
    this.subscribeButton = page.locator('[data-testid="hosted-payment-submit-button"]');
    this.mobDetailsButton = page.locator("._2PMaaF8j__ViewDetailsButton-label");
  }

  addPromotionCode = async (code) => {
    if (!isDesktopViewport(this.page)) {
      await this.mobDetailsButton.waitFor({ state: "visible" });
      await this.mobDetailsButton.click();
      await this.promotionCodeInputMobile.fill(code);
      await this.applyPromotionButton.click();
      await this.page.waitForTimeout(1000);
      await this.mobDetailsButton.click();
      return;
    }
    await this.promotionCodeInput.fill(code);
    await this.page.waitForTimeout(500);
    await this.applyPromotionButton.click();
    await this.page.waitForTimeout(1000);
  };
  toggleSaveInfo = async () => {
    await this.saveInfoCheckbox.waitFor();
    await this.saveInfoCheckbox.check();
    await this.page.waitForTimeout(500);
  };
  populatePhone = async (phone) => {
    await this.phoneInput.fill(phone);
    await this.page.waitForTimeout(500);
  };
  populateEmail = async (email) => {
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(500);
  };
  populateCardDetails = async (cardNumber, expiry, cvc, fullName) => {
    await this.cardNumberInput.fill(cardNumber);
    await this.page.waitForTimeout(300);
    await this.cardExpiryInput.fill(expiry);
    await this.page.waitForTimeout(300);
    await this.cardCVCInput.fill(cvc);
    await this.page.waitForTimeout(300);
    await this.billingNameInput.fill(fullName);
    await this.page.waitForTimeout(500);
  };
  selectCountry = async (country) => {
    await this.countryDropdown.selectOption(country);
    await this.page.waitForTimeout(500);
  };

  submitPayment = async () => {
    await this.subscribeButton.click();
  };
  //   completePayment = async (cardDetails) => {
  //     await this.addPromotionCode(cardDetails.code);
  //     await this.toggleSaveInfo();
  //     await this.populatePhone(cardDetails.phone);
  //     await this.populateEmail(cardDetails.email);
  //     await this.populateCardDetails(cardDetails.cardNumber, cardDetails.expiry, cardDetails.cvc, cardDetails.fullName);
  //     await this.selectCountry(cardDetails.country);

  //     await this.submitPayment();
  //   };
}
