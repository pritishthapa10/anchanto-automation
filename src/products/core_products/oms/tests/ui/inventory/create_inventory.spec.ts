import {test, expect} from '@playwright/test'
import {loginOMS} from '../../../pages/omslogin/login_oms'
import {logOut} from '../../../pages/logoutOms/logout.ts'
import {createInventory} from '../../../pages/inventory/create_inventory.ts'


test('Create New Inventory Product', async ({page})=>{

    //Login in to OMS
    const Login  = new loginOMS(page);
    await Login.omsLogin(process.env.EMAIL!, process.env.PASSWORD!);

    //Navigating to Inventory Module:
    const inventory = new createInventory(page);
    await inventory.openInventoryModule();
    await page.waitForTimeout(2000);

    //Click on Create Product Page
    await inventory.openCreateProductPage();
    await page.waitForTimeout(2000);

    //Filling up mandatory details in Create Product Page
    await inventory.fillCreateProductPage('AUT_ISKU399', 'AUT_Product152`', '1', '1', '1', '1','100', '100');
    await page.waitForTimeout(2000);

    //Click on create product button
    await inventory.clickCreateProductButton();
    await page.waitForTimeout(3000);

    //Search for the created product
    await inventory.searchInventoryProduct('AUT_ISKU36')

    //LogOut from App
    const logout = new logOut(page);
    logout.performLogOut();

})
