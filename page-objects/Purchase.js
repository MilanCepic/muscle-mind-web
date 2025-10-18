import { expect } from "@playwright/test";

export class Purchase {
  constructor(page) {
    this.page = page;

    this.oneMonthSubscription = page.locator('a[href="https://buy.stripe.com/3cI8wOcqP8Twdd81tZebu09"]');
    this.threeMonthsSubscription = page.locator('a[href="https://buy.stripe.com/cNi9AS9eDc5Ib506Ojebu0a"]');
    this.sixMonthsSubscription = page.locator('a[href="https://buy.stripe.com/5kQ3cucqPd9Mehc1tZebu0c"]');
  }

  goToPurchasePageOne = async () => {
    await this.page.waitForTimeout(5000);
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), this.oneMonthSubscription.click()]);
    await expect(newTab).toHaveURL("https://buy.stripe.com/3cI8wOcqP8Twdd81tZebu09", { timeout: 10000 });
    await newTab.close();
  };

  goToPurchasePageThree = async () => {
    await this.page.waitForTimeout(2000);
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), this.threeMonthsSubscription.click()]);
    await expect(newTab).toHaveURL("https://buy.stripe.com/cNi9AS9eDc5Ib506Ojebu0a", { timeout: 10000 });
    await newTab.close();
  };

  goToPurchasePageSix = async () => {
    await this.page.waitForTimeout(2000);
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), this.sixMonthsSubscription.click()]);
    await expect(newTab).toHaveURL("https://buy.stripe.com/5kQ3cucqPd9Mehc1tZebu0c", { timeout: 10000 });
    await newTab.close();
  };

  goToPurchase = async () => {
    await this.goToPurchasePageOne();
    await this.goToPurchasePageThree();
    await this.goToPurchasePageSix();
  };
  goToPurchase25 = async () => {
    await this.page.waitForTimeout(2000);
    const [newTab] = await Promise.all([this.page.context().waitForEvent("page"), this.oneMonthSubscription.click()]);
    //await expect(newTab).toHaveURL(/.*stripe.*/, { timeout: 10000 });
    return newTab;
  };
}
