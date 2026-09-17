import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I navigate to {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
});

Then('the page title should contain {string}', async function (this: CustomWorld, expected: string) {
  const title = await this.page.title();
  expect(title).toContain(expected);
});
