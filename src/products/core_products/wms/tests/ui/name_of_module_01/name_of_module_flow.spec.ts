import { test, expect, Locator } from '@playwright/test';

test('Built-in getByAltText', async ({ page }) => {
    await page.goto('https://medium.com/@ayhanmet/top-websites-for-practicing-test-automation-skills-4f8cb1a27d14');
    await page.waitForTimeout(5000);
    const imgLocator = page.getByAltText('Ayhan Metin').nth(0);
    await imgLocator.click();
    await page.waitForTimeout(5000);
});

test('Built-in getByText', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    await page.waitForTimeout(3000);
    const txtLocator = page.getByText('Web inputs');
    await txtLocator.click();
    await page.waitForTimeout(3000);
});

test('Built-in getByRole', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    await page.waitForTimeout(3000);
    const txtLocator = page.getByRole('button', { name: 'Search' });
    await txtLocator.click();
    await page.waitForTimeout(3000);
});

test('Built-in getByPlaceholder', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    await page.waitForTimeout(3000);
    const txtLocator = page.getByPlaceholder('Search an example...');
    await txtLocator.fill('Just testing man!!!');
    await page.waitForTimeout(3000);
});

test('Built-in getByTestId', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    await page.waitForTimeout(3000);
    const txtLocator: Locator = page.getByTestId('search-button');
    await txtLocator.click();
    await page.waitForTimeout(3000);
});


test('Diff Methods', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/');
    const txtLocator: Locator = page.locator('div.col-md-12');
    console.log(await txtLocator.count());
    // const txtLocator2:Locator = page.getByRole('button',{name: 'Search'});
    const txtLocator2: Locator = page.locator('//*[@id="home-header"]');
    //   console.log(await txtLocator2.textContent());

    const txtLocator3: Locator = page.locator('//*[@id="home-header"]');
    let atContentsArr: Array<string> = await txtLocator3.allTextContents();
    //   console.log(atContentsArr);

    let atContentsArr2: Array<string> = await txtLocator3.allInnerTexts();
    console.log(atContentsArr2);


});


