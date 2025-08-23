import { Page } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

export class OXM_LoginPage
{
    private OXM_LoginButton;
    private OXM_SearchBox;
    private OXM_Password;
    private OXM_LoginPage;

    //The constructor will contain all the locators from the Login page
    constructor(loginPage:Page)
    {
        this.OXM_LoginPage      = loginPage;
        this.OXM_SearchBox      = loginPage.locator('input[type="text"]');
        this.OXM_Password       = loginPage.locator('input[name="password"]');
        this.OXM_LoginButton    = loginPage.getByRole('button', { name: 'Login' });
    }

    //Will land OXM Login page
    async OXM_GoToLoginPage()
    {
        await this.OXM_LoginPage.goto(process.env.OXM_CORE_BASE_URL);
    }

    //Will Login into the system with given username and password
    async OXM_Login(Username, Password)
    {
        await this.OXM_SearchBox.click();
        await this.OXM_SearchBox.fill(Username);
        await this.OXM_Password.click();
        await this.OXM_Password.fill(Password)
        await Promise.all([
            this.OXM_LoginButton.click(),
        ]);
    }
}