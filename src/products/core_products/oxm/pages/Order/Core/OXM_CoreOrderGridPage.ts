import { expect, Page } from "@playwright/test";

export class OXM_CoreOrderGridPage
{
    private OrderModule;
    private OrderSearchBox;
    private OXMOrderPage;
    private actionRequiredLink;
    private offlineOrderTab;
    constructor(OXM_OrderPage : Page)
    {
        this.OXMOrderPage   = OXM_OrderPage;
        this.OrderModule    = OXM_OrderPage.getByRole('link', { name: '' });
        this.OrderSearchBox = OXM_OrderPage.getByRole('textbox', { name: 'Search', exact: true });
    }
    async OXM_NavigateToOrderModule()
    {
        await this.OrderModule.click();
    }
    async OXM_SearchOrder(OrderNumber:string)
    {        
        await this.OrderSearchBox.click();
        await this.OrderSearchBox.fill(OrderNumber);
        await this.OrderSearchBox.press('Enter');

        //Check if searched result is ordernumber  
        const searchedOrder = await this.OXMOrderPage.locator(`td:has-text("${OrderNumber}")`).first();
        await searchedOrder.waitFor({ state: 'visible', timeout: 30000 });
        const isOrderVisible = await searchedOrder.isVisible();
        return isOrderVisible;
    }
}