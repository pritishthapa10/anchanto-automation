import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config({ path: path.resolve(__dirname, 'configs/env/common.env') });


// Load .env file based on NODE_ENV
// console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)

switch (process.env.NODE_ENV) {
  case "prod":
    dotenv.config({ path: path.resolve(__dirname, `configs/env/${process.env.PRODUCT_TYPE}/${process.env.PRODUCT_NAME}/prod.env`) });
    break;
  case "uat":
    dotenv.config({ path: path.resolve(__dirname, `configs/env/${process.env.PRODUCT_TYPE}/${process.env.PRODUCT_NAME}/uat.env`) });
    console.log(`process.env.PASSWORD: ${process.env.PASSWORD}`)
    break;
  case "qa":
    dotenv.config({ path: path.resolve(__dirname, `configs/env/${process.env.PRODUCT_TYPE}/${process.env.PRODUCT_NAME}/qa.env`) });
    break;
  default:
    dotenv.config({ path: path.resolve(__dirname, `configs/env/${process.env.PRODUCT_TYPE}/${process.env.PRODUCT_NAME}/qa.env`) });
}

export default defineConfig({
  testDir: "./src",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html",{open: 'on-failure', outputFolder: 'html-report'}],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
