import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class BlogPage {
  constructor(page) {
    this.page = page;
    this.blogButton = page.getByRole("link", { name: /Blog|Blogs/ });
    this.allBlogLinks = page.locator('a[aria-hidden="true"].link');
    this.burgerButton = page.locator(".sc_layouts_menu_mobile_button a");
    this.mobBlogButton = page.locator('[id="mobile-menu-item-26847"]');
  }

  goToBlog = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor({ state: "visible" });
      await this.burgerButton.click();
      await this.mobBlogButton.waitFor({ state: "visible" });
      await this.mobBlogButton.click();
    } else {
      await this.page.goto("https://musclemind.app/blog/", { timeout: 15000 });
      await expect(this.page).toHaveURL(/\/blog\/|\/en\/blogs\//);
    }
  };

  clickRandomBlog = async () => {
    const blogCount = await this.allBlogLinks.count();
    await this.page.waitForTimeout(2000);
    const randomIndex = Math.floor(Math.random() * blogCount);

    await this.allBlogLinks.nth(randomIndex).click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page.locator("h1").first()).toBeVisible();
  };
}
