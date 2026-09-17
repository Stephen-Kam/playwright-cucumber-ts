import { Page } from '@playwright/test';

/**
 * Common behaviour shared by every page object.
 * Page-specific classes (e.g. ExamplePage) extend this and add
 * their own locators and actions.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
