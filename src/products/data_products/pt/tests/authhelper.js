const { request } = require('@playwright/test');
// require('dotenv').config({ path: './environments/uat.env' }); // adjust path if needed
 
async function getAccessToken() {
  const requestContext = await request.newContext();
 
  const response = await requestContext.post('https://parceltracking-uat.anchanto.com/api/1.0/login', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${process.env.LOGIN_BEARER_TOKEN}`, // Add this in .env
    },
    form: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    }
  });
 
  const status = response.status();
  const body = await response.json();
 
  console.log('Login status:', status);
  console.log('Login response:', body);
 
  const accessToken = body?.data?.access;
 
  if (!response.ok() || !accessToken) {
    throw new Error(`Login failed: ${JSON.stringify(body)}`);
  }
 
  await requestContext.dispose();
  return accessToken;
}
 
module.exports = { getAccessToken };