import { Page, Locator } from '@playwright/test';

export class LoginPageWMS {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("[name='email']");
    this.passwordInput = page.locator("[name='password']");
    this.loginButton = page.locator("div .btn ");
  }

  async navigate() {
    await this.page.goto('https://wms-eu.anchanto.com/login');
  }

  async enterCredentials(username, password) 
  {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.page.locator('.error-text').innerText();
  }

  async isLoggedInSuccessfully(): Promise<boolean> {
    return this.page.url().includes('/dashboard') ||
           await this.page.locator('text=Dashboard').isVisible();
  }
}
