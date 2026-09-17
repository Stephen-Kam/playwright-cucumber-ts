import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { ExamplePage } from '../pages/ExamplePage';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.examplePage = new ExamplePage(this.page);
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.context.close();
});
