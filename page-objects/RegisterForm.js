import { v4 as uuidv4 } from "uuid";
import { expect } from "@playwright/test";
export class RegisterForm {
  constructor(page) {
    this.page = page;

    this.nameInputField = page.locator("#form-field-field_6b514f4");
    this.emailInputField = page.locator("#form-field-message");
    this.phoneInputField = page.locator("#form-field-email");
    this.messageInputField = page.locator("#form-field-field_4a1efe3");
    this.submitButton = page.getByRole("button", { name: /SUBMIT|POŠALJite/ });
    this.closeButton = page.getByRole("button", { name: "Close" });
    this.errorMessagePhone = page.locator(".elementor-message-danger", { hasText: "The field accepts only numbers and phone characters (#, -, *, etc)." });
    this.errorMessageOne = page.locator(".elementor-message-danger", { hasText: "This field is required." });
    this.errorMessageTwo = page.locator(".elementor-message-danger", { hasText: "Desila se nepoznata greška." });
  }

  populateForm = async () => {
    await this.nameInputField.waitFor();
    await this.nameInputField.fill("Tester Testerson");

    await this.emailInputField.waitFor();
    const email = uuidv4() + "@gmail.com";
    await this.emailInputField.fill(email);

    await this.phoneInputField.waitFor();
    await this.phoneInputField.fill("+381601234567");

    await this.messageInputField.waitFor();
    await this.messageInputField.fill("This is a test message. Please ignore.");
  };
  populateWrongForm = async () => {
    await this.nameInputField.waitFor();
    await this.nameInputField.fill("12345");

    await this.emailInputField.waitFor();
    await this.emailInputField.fill("12345@1234");

    await this.phoneInputField.waitFor();
    await this.phoneInputField.fill("asdfasdf");

    await this.messageInputField.waitFor();
    await this.messageInputField.fill("This is a test message. Please ignore.");
  };

  populateFormAndClose = async () => {
    await this.populateForm();
    await this.closeButton.waitFor();
    await this.closeButton.click();
  };
  populateFormWrongAndClose = async () => {
    await this.populateWrongForm();
    await this.submitButton.waitFor();
    await this.submitButton.click();
    await this.errorMessagePhone.waitFor();
    await expect(this.errorMessagePhone).toBeVisible();
    await this.errorMessageOne.waitFor();
    await expect(this.errorMessageOne).toBeVisible();
    await this.errorMessageTwo.waitFor();
    await expect(this.errorMessageTwo).toBeVisible();
    await this.closeButton.waitFor();
    await this.closeButton.click();
  };

  populateFormAndSubmit = async () => {
    await this.populateForm();
    await this.submitButton.waitFor();
    await this.submitButton.click();
    await this.closeButton.waitFor();
    await this.closeButton.click();
  };
}
