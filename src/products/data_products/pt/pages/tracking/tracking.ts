import { expect, Locator, Page } from '@playwright/test';

export class Tracking {
  private page: Page;
  private filterIcon: Locator;
  private trackingInput: Locator;
  private searchButton: Locator;
  private detailedEventsTab: Locator;
  private senderDetailsTab: Locator;
  private receiverDetailsTab: Locator;
  private parcelDetailsTab: Locator;
  private parcelDetailsHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterIcon = page.getByRole('link', { name: '' });
    this.trackingInput = page.getByRole('textbox', { name: 'Enter upto 100 Tracking' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.detailedEventsTab = page.getByText('Detailed Events1');
    this.senderDetailsTab = page.locator('a').filter({ hasText: 'Sender Details' });
    this.receiverDetailsTab = page.locator('a').filter({ hasText: 'Receiver Details' });
    this.parcelDetailsTab = page.locator('a').filter({ hasText: 'Parcel Details' });
    this.parcelDetailsHeader = page.getByTestId('parcelDetailsHeader');
  }

  async searchTrackingId(trackingId: string): Promise<void> {
    await this.filterIcon.click();
    await this.trackingInput.fill(trackingId);
    await this.searchButton.click();
  }

  async openTrackingDetails(trackingIdText: string): Promise<void> {
    const trackingResult = this.page.getByText(trackingIdText);
    await expect(trackingResult).toBeVisible();
    await trackingResult.click();
  }

  async navigateTabs(): Promise<void> {
    await expect(this.detailedEventsTab).toBeVisible();
    await this.detailedEventsTab.click();
    await this.page.waitForTimeout(1000);

    await this.senderDetailsTab.click();
    await expect(this.page.getByText('Sender Details')).toBeVisible();
    await this.page.waitForTimeout(1000);

    await this.receiverDetailsTab.click();
    await expect(this.page.getByText('Receiver Details')).toBeVisible();
    await this.page.waitForTimeout(1000);

    await this.parcelDetailsTab.click();
    await expect(this.parcelDetailsHeader).toBeVisible();
    await this.page.waitForTimeout(1000);
  }


}
