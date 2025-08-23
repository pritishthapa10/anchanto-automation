import { test, expect, request } from '@playwright/test';
import { OXM_APIUtils } from '../../../../../../../utils/helpers/core_products/oxm/api/OXM_APIUtils';
import { CommonAPIUtils } from '../../../../../../../utils/helpers/CommonAPIUtils';
import config from '../../../../../../../playwright.config';

let APIaccessToken: any;
let OXM_APIUtils_Obj: OXM_APIUtils;

test.beforeAll('Set OXM client and Generate Token', async () => {
  OXM_APIUtils_Obj = new OXM_APIUtils(
    process.env.OXM_CustomerName,
    process.env.OXM_Username,
    process.env.OXM_Password,
    process.env.OXM_BearerToken
  );
  APIaccessToken = await OXM_APIUtils_Obj.OXM_GenerateToken();
});

//WORKING : DONOT DELETE
// test('Get B2C Order by ID', async ({ page }) => {
//       // Step 1: Validate Order ID is available
//       // let OXM_OrderID     = 1968079;
//       // let Ordernumber     = 'AWB2CAPI5I0LJ';
      
//       const GetOrderResponse = await APIUtils_Obj.OXM_GetOrderByID(1968148);
//       // Step 4: Validate the response
//       expect.soft(GetOrderResponse.status(), 'Expected status code 200').toBe(200);
        
//       // Validate that the order number matches the one created earlier
//       const responseBody = await GetOrderResponse.json();
//       console.log(responseBody);
//       expect(responseBody.data.event.order_number).toBe('AWB2COrdNumAPI972');
//     });

test('Get B2C Order by ID', async ({ page }) => {
      // Step 1: Validate Order ID is available
      let OXM_OrderID     = 1968079;
      let Ordernumber     = 'AWB2CAPI5I0LJ';

      const CommonAPIUtils_obj = new CommonAPIUtils(
        process.env.OXM_API_BASE_URL,
        APIaccessToken,
        `/external-api/v1/orders/b2c/${OXM_OrderID}`);
      
      //Step 2: Call Get Order by ID API
      const GetOrderResponse = await CommonAPIUtils_obj.ExecuteGetRequest();
      expect.soft(GetOrderResponse.status(), 'Expected status code 200').toBe(200);
        
      // Step3 : Validate that the order number matches the one created earlier
      const responseBody = await GetOrderResponse.json();
      console.log(responseBody.data);
      expect.soft(responseBody.data.event.order_number).toBe(`${Ordernumber}`);
    });