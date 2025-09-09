import { test, expect } from '@playwright/test'
import { queryDB } from '../../../../../../../utils/helpers/core_products/oms/dbUtils'


test('Test Database connnectivity', async ({ page }) => {
    const rows = await queryDB("SELECT * FROM users");
    rows.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
    });
})