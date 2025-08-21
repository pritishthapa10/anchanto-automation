import { expect, Locator, Page } from '@playwright/test';

export class createInventory{
    private page: Page;
    private inventoryIcon: Locator;
    private inventoryHeader: Locator;
    private addInventory: Locator;
    private verifyAddProduct: Locator;
    private iskuName: Locator;
    private iskuProductName: Locator;
    private weight: Locator;
    private height: Locator;
    private length: Locator;
    private width: Locator;
    private availableStock: Locator;
    private costPrice: Locator;
    private createProductBtn : Locator;
    private searchIsku: Locator


    constructor(page: Page){
        this.page = page;
        this.inventoryIcon = page.locator(`//a[@data-nav = 'Inventory']`);
        this.inventoryHeader = page.locator(`//span[text() = 'INVENTORY']`);
        this.addInventory = page.locator(`//button[@id='btn-addProduct']`);
        this.verifyAddProduct = page.locator(`//li[text()='Create Product']`);
        this.iskuName = page.locator(`//input[@formcontrolname='isku']`);
        this.iskuProductName = page.locator(`//input[@formcontrolname='productName']`);
        this.weight = page.locator(`//input[@formcontrolname='dimensionWeight']`);
        this.height = page.locator(`//input[@formcontrolname='dimensionHeight']`);
        this.length = page.locator(`//input[@formcontrolname='dimensionDepth']`);
        this.width = page.locator(`//input[@formcontrolname='dimensionWidth']`);
        this.availableStock = page.locator(`//input[@formcontrolname='availableStock']`);
        this.costPrice = page.locator(`//input[@formcontrolname='costPrice']`);
        this.createProductBtn = page.locator(`//button[@type='submit']`);
        this.searchIsku = page.locator(`//input[@id = 'search_item']`);

    }


    async  openInventoryModule() {
        await this.inventoryIcon.click();
        await expect(this.inventoryHeader).toBeVisible();
    }

    async openCreateProductPage(){
        await this.addInventory.click();
        await expect(this.verifyAddProduct).toBeVisible();
    }

    async fillCreateProductPage(iskuName: string, iskuProductName: string, weight: string, height: string, width: string, length: string, availableStock: string, costPrice:string ){
        await this.iskuName.fill(iskuName);
        await this.iskuProductName.fill(iskuProductName);
        await this.weight.fill(weight);
        await this.height.fill(height);
        await this.width.fill(width);
        await this.length.fill(length);
        await this.availableStock.fill(availableStock);
        await this.costPrice.fill(costPrice);
    }

    async clickCreateProductButton(){
        await this.createProductBtn.click();
    }  
    
    async searchInventoryProduct(iskuName: string){
        await this.searchIsku.fill('');
        await this.searchIsku.fill(iskuName);
        await this.searchIsku.press('Enter')
        let loc:Locator = this.page.getByText(iskuName);
        await expect(loc).toBeVisible();
    }
}