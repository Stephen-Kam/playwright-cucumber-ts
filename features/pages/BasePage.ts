import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Standard WCAG conformance level scanned for on every accessibility check.
const ACCESSIBILITY_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'];

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

  /**
   * Runs an axe-core accessibility scan against the page in its current state,
   * scoped to WCAG 2.0 A, WCAG 2.0 AA and WCAG 2.1 AA rules (see ACCESSIBILITY_TAGS).
   * Returns the full axe results object (results.violations is the key field).
   */
  async runAccessibilityScan() {
    return new AxeBuilder({ page: this.page }).withTags(ACCESSIBILITY_TAGS).analyze();
  }
}
