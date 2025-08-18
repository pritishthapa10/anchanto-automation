import { test } from '@playwright/test';
import { Tracking } from '../../../pages/tracking/tracking';
import { Logout } from '../../../pages/logout/logout';
import { Login } from '../../../pages/login/login';
 
test('Parcel Tracking Module - Advanced Search + Flow Test', async ({ page }) => {
  const loginPage = new Login(page);
 
  // Login
  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
 
  // Search Tracking ID
  // await uiPage.searchTrackingId('test;996015450000025253;996015450000025253;996015450000025263;996015450000025263;996015450000025266;996015450000025266;996015450000025269;996015450000025269');
  
  const trackingPage = new Tracking(page);
  await trackingPage.searchTrackingId('test;');

  // Open and Validate Tracking Details
  await trackingPage.openTrackingDetails('UX064213771FR');
 
  // Navigate through tabs
  await trackingPage.navigateTabs();

  const logoutPage = new Logout(page);
 
  // Perform action and logout
  await logoutPage.performActionAndLogout();
});