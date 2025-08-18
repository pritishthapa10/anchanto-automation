import { expect, Locator, Page } from '@playwright/test';

export class Login {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email ID *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.page.goto('https://parceltracking-uat.anchanto.com/login');
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
