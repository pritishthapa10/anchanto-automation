import { test, expect, request } from '@playwright/test';
import { RandomDataUtil } from '../../../../../../../utils/randomDataGenerator';
import { OXM_APIUtils } from '../../../../../../../utils/helpers/core_products/oxm/api/OXM_APIUtils';
import { CommonAPIUtils } from '../../../../../../../utils/helpers/CommonAPIUtils';

let APIaccessToken: any;
let OXM_APIUtils_Obj: OXM_APIUtils;

test.beforeAll('Set OXM client and Generate Token', async () => {

  const OXM_APIUtils_Obj = new OXM_APIUtils(
    process.env.OXM_CustomerName,
    process.env.OXM_Username,
    process.env.OXM_Password,
    process.env.OXM_BearerToken
  );
  APIaccessToken = await OXM_APIUtils_Obj.OXM_GenerateToken();
  console.log('OXM API Access Token in beforeAll:', APIaccessToken);
  });

test('Create B2C Order via API', async ({page}) => {
  // Step 1: Generate random order number
  const OXM_CreatedOrderNumber = `AWB2CAPI${RandomDataUtil.getRandomAlphanumeric(5)}`;
  console.log('Generated Order Number:', OXM_CreatedOrderNumber);

  // Step 2: Create order payload
  const requestBody = {
    b2c_order: {
      customer_id: process.env.OXM_CustomerID,
      pick_up_location_id: RandomDataUtil.getRandomAlphanumeric(6),
      pick_up_address_id: RandomDataUtil.getRandomAlphanumeric(6),
      dropoff_location_id: RandomDataUtil.getRandomAlphanumeric(6),
      dropoff_address_id: RandomDataUtil.getRandomAlphanumeric(6),
      warehouse_name: process.env.OXM_Warehouse,
      shipping_type: 'Std Delivery API',
      carrier_name: 'API_STD_DEL',
      order_number: OXM_CreatedOrderNumber,
      currency: 'INR',
      delivery_date: OXM_APIUtils.getTodaysDate(),
      instruction: 'This is special instruction B2C Order',
      payment_collection: 'Online',
      custom_duty: 'DDU',
      adjustment_attributes: {
        total_payble: 1000,
        shipping_cost: 0,
        tax_amount: 0,
        discount: 0,
        sub_total: 1000
      },
      order_items_attributes: [
      {
        sku: process.env.OXM_CreateOrderSKU,
        unit_price: 100,
        retail_price: 100,
        selling_price: 100,
        quantity: process.env.OXM_CreateOrderQty,
        uom: "PCS_1"
     },
    ],
      billing_address_attributes: {
        first_name: RandomDataUtil.getFirstName(),
        last_name: RandomDataUtil.getlastName(),
        business_name: 'Company Business',
        phone: "12312312",
        email: RandomDataUtil.getEmail(),
        address1: RandomDataUtil.getRandomAddress(),
        address2: RandomDataUtil.getRandomAddress(),
        address3: RandomDataUtil.getRandomAddress(),
        country_iso2: 'IN',
        country_iso3: 'IND',
        state: 'Maharashtra',
        city: 'Pune',
        suburb: 'Baner',
        zipcode: '411045'
      },
      shipping_address_attributes: {
        first_name: RandomDataUtil.getFirstName(),
        last_name: RandomDataUtil.getlastName(),
        business_name: 'Company Business',
        phone: "34324234",
        email: RandomDataUtil.getEmail(),
        address1: RandomDataUtil.getRandomAddress(),
        address2: RandomDataUtil.getRandomAddress(),
        address3: 'Pune',
        country_iso2: 'IN',
        country_iso3: 'IND',
        state: 'Maharashtra',
        city: 'Pune',
        suburb: 'Baner',
        zipcode: '411045'
      }
    }
  }
  
    // Execute Create B2C Order API
    console.log('Request Body for Create B2C Order:', requestBody.toString());

    const CommonAPIUtils_obj = new CommonAPIUtils(
            process.env.OXM_API_BASE_URL,
            APIaccessToken,
            '/external-api/v1/orders/b2c');
                      
    //Step 2: Call Get Order by ID API
    const GetOrderResponse = await CommonAPIUtils_obj.ExecutePostRequest(requestBody);
    console.log('Create B2C Order API Response:', GetOrderResponse);
    // Check if the response status is 201 Created
    expect.soft(GetOrderResponse.status(), 'Expected status code 201').toBe(201);
    
    //Validate the message in the response
    // const responseBody = await GetOrderResponse.json();
    // expect.soft(responseBody.message).toBe('B2C Order created successfully.');
  
});