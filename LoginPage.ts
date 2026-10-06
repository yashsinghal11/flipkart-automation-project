import { Page, expect } from '@playwright/test';

export class LoginPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickLogin(): Promise<void> {
        await this.page.locator('a[title="Login"]').click();
    }

    async enterMobileNumber(mobileNumber: string): Promise<void> {
        await this.page
            .locator('input[type="number"]')
            .fill(mobileNumber);
    }

    async clickContinue(): Promise<void> {
        await this.page
            .locator('button', { hasText: 'Continue' })
            .click();
    }

    async waitForOTPAndVerify(): Promise<void> {

        console.log('Please enter OTP manually...');

        const verifyButton = this.page.locator('button', {
            hasText: 'Verify'
        });

        await expect(verifyButton).toBeEnabled({
            timeout: 120000
        });

        console.log('OTP entered. Verify button is enabled.');

        await verifyButton.click();
    }

    async login(mobileNumber: string): Promise<void> {

        await this.clickLogin();

        await this.enterMobileNumber(mobileNumber);

        await this.clickContinue();

        await this.waitForOTPAndVerify();
    }
}