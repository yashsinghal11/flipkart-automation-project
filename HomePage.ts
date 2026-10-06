import { Page, expect } from '@playwright/test';

export class HomePage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifySearchBox(): Promise<void> {

        const searchBox = this.page.locator(
            'input[name="q"][placeholder="Search for products, brands and more"]'
        );

        await expect(searchBox).toBeVisible();
    }

    async searchProduct(productName: string): Promise<void> {

        const searchBox = this.page.locator(
            'input[name="q"][placeholder="Search for products, brands and more"]'
        );

        await searchBox.fill(productName);

        const searchButton = this.page.locator(
            'button.bJtikv[type="submit"]'
        );

        await expect(searchButton).toBeVisible();

        await searchButton.click();

        await this.page.waitForURL(/\/search/, {
            timeout: 15000
        });
    }
}