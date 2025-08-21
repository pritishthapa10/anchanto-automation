import { test, expect } from '@playwright/test'
import { loginOMS } from '../../../pages/omslogin/login_oms'
import { logOut } from '../../../pages/logoutOms/logout'
import { editInventory } from '../../../pages/inventory/edit_inventory'


test('Edit Inventory', async ({ page }) => {

    //Login in to OMS
    const Login = new loginOMS(page);
    await Login.omsLogin(process.env.EMAIL!, process.env.PASSWORD!);

    //Navigating to Inventory Module:
    const inventory = new editInventory(page);
    await inventory.openInventoryModule();
    await page.waitForTimeout(2000);

    //Search for a Product
    await inventory.searchInventoryProduct('AUT_ISKU399');

    //click on Edit Button
    await inventory.clickOnEditBtn();

    //make changes in update page
    await inventory.editProductPage('Updated ISKU Product Name 1', '120')

    //verify changes in SKU
    await inventory.verifyEditedProduct('Updated ISKU Product Name 1')

    //LogOut from App
    // const logout = new logOut(page);
    // logout.performLogOut();

})