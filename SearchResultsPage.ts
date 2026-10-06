import { Page, expect } from '@playwright/test';

export class SearchResultsPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifySearchResultsDisplayed(): Promise<void> {

        const productTitles = this.page.locator('div.RG5Slk');

        await expect(productTitles.first()).toBeVisible({
            timeout: 20000
        });
    }

    async getFirstProductTitle(): Promise<string> {

        await this.verifySearchResultsDisplayed();

        const productTitles = this.page.locator('div.RG5Slk');

        return (await productTitles.first().innerText()).trim();
    }

    async verifyFirstProductTitle(expectedTitle: string): Promise<void> {

        const actualTitle = await this.getFirstProductTitle();

        console.log('Expected:', expectedTitle);
        console.log('Actual:', actualTitle);

        expect(actualTitle).toBe(expectedTitle);
    }
}