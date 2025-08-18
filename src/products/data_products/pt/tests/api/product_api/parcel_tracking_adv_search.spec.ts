// Import Playwright's test runner modules
const { test, expect, request } = require('@playwright/test');
 
// Import the login helper to dynamically retrieve the access token
const { getAccessToken } = require('../../../../../../../utils/helpers/data_products/pt/api/login');


 
// Describe the test suite
test.describe('Parcel Tracking Advanced Filter API', () => {
  let apiContext;
  let response;
  let json;
  let responseTime;
  let token;
 
  // Sample parcel IDs for the test payload
  const ids = [
    "00099126100370528829", "00099126100370727253", "00099126100370915803",
    "00099126100370480233", "00099126100370807467", "00099126100370526870",
    "00099126100370781767", "00099126100370527051"
  ];
 
  // This block runs once before all tests
  test.beforeAll(async () => {
    // Step 1: Get dynamic access token using the helper function
    token = await getAccessToken();
    console.log("Access token: ",token);

    // Step 2: Create a new request context (isolated API client)
    apiContext = await request.newContext();
 
    // Step 3: Define the API endpoint URL
    const url = `https://parceltracking-uat.anchanto.com/api/1.0/parcel-tracking/advanced-filter?psz=50&sort=shipment_date`;
 
    // Step 4: Measure response time
    const start = Date.now();
 
    // Step 5: Send the POST request
    response = await apiContext.post(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Origin: 'https://parceltracking.anchanto.com',
        Referer: 'https://parceltracking.anchanto.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'x-language': 'en',
        'x-tenant-id': 'parceltracking.anchanto.com',
      },
      data: {
        ids: ids,
        is_critical: false,
        forward: true,
        search_after: [],
        count: 0
      }
    });
 
    // Step 6: Measure end time and calculate response time
    const end = Date.now();
    responseTime = end - start;
 
    // Step 7: Parse the response JSON
    json = await response.json();
 
    // Step 8: Log response for debugging
    console.log('🔍 Response JSON:', JSON.stringify(json, null, 2));
    console.log(`⏱️ Response time: ${responseTime} ms`);
  });
 
  // ✅ Test: Status code is 200
  test('Response status is 200', () => {
    expect(response.status()).toBe(200);
  });
 
  // ✅ Test: Content-Type is JSON
  test('Response has JSON content-type', () => {
    expect(response.headers()['content-type']).toContain('application/json');
  });
 
  // ✅ Test: Response is fast
  test('Response time under 3 seconds', () => {
    expect(responseTime).toBeLessThan(3000);
  });
 
  // ✅ Test: JSON structure validation
  test('Response contains summary and data arrays', () => {
    expect(json).toHaveProperty('summary');
    expect(json).toHaveProperty('data');
    expect(Array.isArray(json.data)).toBe(true);
  });
 
  // ✅ Test: First data record has required fields
  test('Data contains expected fields', () => {
    const data = json.data[0];
    if (!data) {
      throw new Error('No data returned to validate fields.');
    }
 
    const expectedFields = [
      'ft_id', 'order_id', 'tracking_id', 'date_shipped', 'shipment_date',
      'delivery_date', 'arrdest_date', 'sender_name', 'latest_event_desc',
      'latest_event_time', 'parcel_progress', 'exception_status', 'business_id',
      'shipment_source', 'product_code', 'subsidiary_id', 'customer_id',
      'latest_receptacle_id', 'previous_receptacle_id', 'return_ref', 'current_status',
      'transit_time', 'origin', 'destination', 'latest_carrier_code', 'carrier_name',
      'max_parcel_progress', 'latest_harmonized_code', 'recipient_name', 'parcel_status',
      'latest_harmonized_desc', 'parcel_progress_as_int', 'origin_country_name',
      'destination_country_name', 'subsidiary_name', 'customer_name',
      'product_description', 'stepper_status', 'event_time_list'
    ];
 
    for (const field of expectedFields) {
      expect(data).toHaveProperty(field);
    }
  });
 
  // ✅ Cleanup after all tests
  test.afterAll(async () => {
    await apiContext.dispose();
  });
});