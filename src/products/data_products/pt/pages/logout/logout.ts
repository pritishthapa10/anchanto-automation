import { expect, Locator, Page } from '@playwright/test';

export class Logout {
    private page: Page;
    private emailInput: Locator;
    private optionsButton: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.optionsButton = page.getByRole('button', { name: '' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.emailInput = page.getByRole('textbox', { name: 'Email ID *' });
    }

    async performActionAndLogout(): Promise<void> {
        await this.optionsButton.click();
        await this.page.waitForTimeout(1000);
        await this.logoutButton.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page).toHaveURL(/.*login/);
        await expect(this.emailInput).toBeVisible();
    }
}
