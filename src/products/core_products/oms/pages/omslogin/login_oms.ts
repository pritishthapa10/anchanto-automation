import {Page, expect, Locator} from '@playwright/test'

export class loginOMS{
    private page: Page;
    private userName: Locator;
    private passwordInput: Locator;
    private signInButton: Locator

    constructor(page: Page){
        this.page = page;
        this.userName = page.locator(`//input[@name = 'email']`);
        this.passwordInput = page.locator(`//input[@name = 'password']`);
        this.signInButton = page.locator(`//button[@type= 'submit']`)
    }

    async omsLogin(email: string, password:string){
        await this.page.goto('https://ssuistag.selluseller.com/login');
        await expect(this.userName).toBeVisible();
        await this.userName.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}