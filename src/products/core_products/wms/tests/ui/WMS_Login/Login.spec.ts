import {test, expect} from '@playwright/test'
import { LoginPageWMS } from '../../../pages/wmslogin/Login_wms';
// import { LoginPageWMS } from '../../../pages/wmslogin/Login_wms.ts';
//import {logOut} from '../../../pages/logoutOms/logout.ts'
//import {createInventory} from '../../../pages/inventory/create_inventory.ts'


test('Login WMS', async ({page})=>{

    //Login in to OMS
    const Login  = new LoginPageWMS(page);
    await Login.navigate();
    console.log("EmailID"+process.env.EMAIL);
    await Login.enterCredentials(process.env.EMAIL, process.env.PASSWORD);
    await Login.submit();
});

