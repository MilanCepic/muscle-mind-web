import { test, expect } from "@playwright/test";
import { ContactPage } from "../page-objects/ContactPage.js";
import { LanguageSwitcher } from "../page-objects/LanguageSwitcher.js";
import { RegisterForm } from "../page-objects/RegisterForm.js";
import { HomePage } from "../page-objects/HomePage.js";
import { ProgramsPage } from "../page-objects/ProgramsPage.js";
import { Footer } from "../page-objects/Footer.js";
import { BlogPage } from "../page-objects/BlogPage.js";
import { FAQ } from "../page-objects/FAQ.js";
import { AboutUs } from "../page-objects/AboutUs.js";
import { Purchase } from "../page-objects/Purchase.js";
import { PaymentPage } from "../page-objects/PaymentPage.js";
import { cardDetails } from "../data/cardDetails.js";

test("Full user journie", async ({ page }) => {
  await page.goto("/");

  const languageSwitcher = new LanguageSwitcher(page);
  await languageSwitcher.testLanguageSwitching();

  const contactPage = new ContactPage(page);
  await contactPage.goToContact();
  await contactPage.assertOnContactPage();

  const registerForm = new RegisterForm(page);
  await contactPage.clickMarketingTab();
  await registerForm.populateFormAndClose();
  await contactPage.clickSupportTab();
  await registerForm.populateFormWrongAndClose();
  await contactPage.clickCarrersTab();
  await registerForm.populateFormAndSubmit();

  const homePage = new HomePage(page);
  await homePage.gotoHomePageTabs();

  const footer = new Footer(page);
  await footer.testAllFooter();

  await homePage.gotoBlogLinksFromHomePage();

  const blogPage = new BlogPage(page);

  await blogPage.goToBlog();

  await blogPage.clickRandomBlog();

  await homePage.gotoHomePage();

  await homePage.testSliderNavigation();
  await homePage.clickRandomProgram();

  const faq = new FAQ(page);
  await faq.goToFAQ();
  await faq.assertOnFAQPage();
  await faq.testRandomFAQs();
  await faq.openRandomFAQs();

  const aboutUs = new AboutUs(page);
  await aboutUs.goToAboutUs();
  await aboutUs.assertOnAboutUsPage();
  await aboutUs.clickFindOutMore();
  await aboutUs.testSwiperNavigationTop();
  await aboutUs.testRandomAboutUs();
  await aboutUs.openRandomAboutUs();
  await aboutUs.goToFAQFromAboutUs();
  await faq.assertOnFAQPage();

  const programsPage = new ProgramsPage(page);
  await programsPage.goToProgramsPage();
  await programsPage.testAllPrograms();

  const purchase = new Purchase(page);
  await purchase.goToPurchase();
  const purchaseTab = await purchase.goToPurchase25();

  const paymentPage = new PaymentPage(purchaseTab);
  await paymentPage.addPromotionCode(cardDetails.code);
  await paymentPage.toggleSaveInfo();
  await paymentPage.populatePhone(cardDetails.phone);
  await paymentPage.populateEmail(cardDetails.email);
  await paymentPage.populateCardDetails(cardDetails.cardNumber, cardDetails.expiry, cardDetails.cvc, cardDetails.fullName);
  await paymentPage.selectCountry(cardDetails.country);

  //await expect(paymentPage.subscribeButton).toBeEnabled();
  await purchaseTab.close();
});
