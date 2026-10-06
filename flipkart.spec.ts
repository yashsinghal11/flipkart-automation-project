import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test.describe('Flipkart Automation', () => {

    test('Login and verify first MacBook search result', async ({ page }) => {

        // Create Page Objects
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const searchResultsPage = new SearchResultsPage(page);


        // ------------------------------------------------
        // STEP 1: Open Flipkart
        // ------------------------------------------------

        await page.goto('https://www.flipkart.com/');

        await expect(page).toHaveURL(/flipkart\.com/);


        // ------------------------------------------------
        // STEP 2: Login
        // ------------------------------------------------

        await loginPage.login('6398034647');


        // ------------------------------------------------
        // STEP 3: Verify search box
        // ------------------------------------------------

        await homePage.verifySearchBox();


        // ------------------------------------------------
        // STEP 4: Search MacBook laptop
        // ------------------------------------------------

        await homePage.searchProduct('macbook laptop');


        // ------------------------------------------------
        // STEP 5: Verify first search result
        // ------------------------------------------------

        const expectedTitle =
            'Apple MacBook Air (M5, 2026) M5 - (16 GB/512 GB SSD/Tahoe) MDHE4HN/A';

        await searchResultsPage.verifyFirstProductTitle(
            expectedTitle
        );
    });

});