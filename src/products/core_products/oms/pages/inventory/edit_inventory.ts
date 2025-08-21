import { expect, Locator, Page } from "@playwright/test";

export class editInventory{
    private page: Page;
    private inventoryIcon: Locator;
    private inventoryHeader: Locator;
    private searchIsku: Locator
    private editBtn: Locator
    private updatePrdName: Locator;
    private updateStock: Locator;
    private updateBtn: Locator
    private updateHeader: Locator


constructor(page: Page){
        this.page = page;
        this.inventoryIcon = page.locator(`//a[@data-nav = 'Inventory']`);
        this.inventoryHeader = page.locator(`//span[text() = 'INVENTORY']`);
        this.searchIsku = page.locator(`//input[@id = 'search_item']`);
        this.editBtn = page.locator(`(//a[contains(text(),'Edit')])[1]`);
        this.updatePrdName = page.locator(`//input[@formcontrolname='productName']`);
        this.updateStock = page.locator(`//input[@formcontrolname='availableStock']`);
        this.updateBtn = page.locator(`//span[text() ="Update Product"]`)
        this.updateHeader = page.locator(`//li[text()='Update Product']`);

}

 async  openInventoryModule() {
        await this.inventoryIcon.click();
        await expect(this.inventoryHeader).toBeVisible();
    }

async searchInventoryProduct(iskuName: string){
        await this.searchIsku.fill('');
        await this.searchIsku.fill(iskuName);
        await this.searchIsku.press('Enter')
        // let loc:Locator = this.page.getByText(iskuName);
        // await expect(loc).toBeVisible();
    }

    async clickOnEditBtn(){
        await this.editBtn.click();
        await expect(this.updateHeader).toBeVisible();
    }

    async editProductPage(prdName: string, updatedStock:string){
        await this.page.waitForTimeout(1000);
        await this.updatePrdName.fill(prdName);
        await this.page.waitForTimeout(1000);
        await this.updateStock.fill(updatedStock);
        await this.page.waitForTimeout(2000);
        await this.updateBtn.click();
        await expect(this.searchIsku).toBeVisible();
    }

    async verifyEditedProduct(prdName: string){
        await this.searchIsku.fill('');
        await this.searchIsku.fill(prdName);
        await this.searchIsku.press('Enter')
        let stockLoc: Locator = this.page.getByText(prdName);
        await expect(stockLoc).toBeVisible();
    }


}