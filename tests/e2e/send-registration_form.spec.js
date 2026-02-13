import { test, expect } from '@playwright/test';
import path from 'path';
const fs = require('fs');

test.describe('Face matching: upload photo in Compare', function () {
    test.beforeEach(async ({ page }) => {
    await page.goto('https://faceapi.regulaforensics.com');
    const cookibunner = page.getByRole('button', { name: 'Accept all cookies' }).first();    
    await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

    try {
        await expect(cookibunner).toBeHidden(); 
    } catch (e) {
        console.log('Баннер не появился за 5 секунд, продолжаем тест без клика');
    }
});

    test('Checking the submission of the registration form via the Get in Touch button', async ({ page }) => {
    const form = page.locator('form.hs-form');
    await form.waitFor({ state: 'visible' });
    await form.locator('input[name="firstname"]').fill('Иван');
    await form.locator('input[name="lastname"]').fill('Иванов');
    await form.locator('input[name="jobtitle"]').fill('QA Engineer');
    await form.locator('input[name="company"]').fill('Test Company');
    await form.locator('select[name="contact_industry"]').selectOption('Fintech');
    await form.locator('select[name="verifications"]').selectOption('1.000.000+');
    await form.locator('input[name="phone"]').fill('+11122334455');
    await form.locator('input[name="email"]').fill('test@mycompany.com');
    await form.locator('textarea[name="message"]').fill('Hello, this is a test message.');
    await form.locator('select[name="contact_country"]').selectOption('Belarus');
    await page.locator('input[name="gdpr_eu"]').check();
    await expect(page.locator('input[name="gdpr_eu"]')).toBeChecked();
    await form.locator('input[type="submit"]').click(); 
    const successTitle = page.getByText(/Thank you, your subscription is confirmed!/i);
    await expect(successTitle).toBeVisible({ timeout: 5000 });
});
});

