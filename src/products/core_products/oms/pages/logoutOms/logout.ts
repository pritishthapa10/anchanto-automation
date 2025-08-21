import {expect, Page, Locator} from '@playwright/test';

export class logOut{

    private page: Page;
    private accountSettingBtn: Locator
    private logOutBtn: Locator
    private userName: Locator

    constructor(page: Page){
        this.page = page;
        this.accountSettingBtn = page.getByRole('listitem').filter({ hasText: 'Click to open Account' }).locator('a').first()
        this.userName = page.locator(`//input[@name = 'email']`);
    }

    async performLogOut(){
        await this.accountSettingBtn.click();
        await this.page.waitForTimeout(1500);
        await this.logOutBtn.click();
        await this.page.waitForTimeout(1500);
        await expect(this.page).toHaveURL(/.*login/);
        await expect(this.userName).toBeVisible();
    }
}