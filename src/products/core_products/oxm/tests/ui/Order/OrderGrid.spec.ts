import { test, expect } from '@playwright/test';
import { OXM_LoginPage } from '../../../pages/Login/OXM_LoginPage';
import { OXM_CoreOrderGridPage } from '../../../pages/Order/Core/OXM_CoreOrderGridPage';

test('Validate B2C order created in OXM UI', async ({ page }) => {
  const OXM_CreatedOrderNumber = 'AWB2CAPI5I0LJ'; // Replace with the actual order number created via API
  
  //Login to OXM
    const obj_OXM_LoginPage = new OXM_LoginPage(page);
    await obj_OXM_LoginPage.OXM_GoToLoginPage();
    await obj_OXM_LoginPage.OXM_Login(process.env.OXM_Username, process.env.OXM_Password);
    
    //Navigate to Order module
    const obj_OXM_CoreOrderPage = new OXM_CoreOrderGridPage(page);
    await obj_OXM_CoreOrderPage.OXM_NavigateToOrderModule();

    //Search for order created by API
    console.log("Search for order=>"+ OXM_CreatedOrderNumber);
    const uiValidationResult = await obj_OXM_CoreOrderPage.OXM_SearchOrder(OXM_CreatedOrderNumber);
    console.log(uiValidationResult);
    expect(uiValidationResult).toBeTruthy();
});