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
        console.log('The banner did not appear in 5 seconds, we continue the test without clicking');
    }
});

    test('Checking the photo upload in the Face matching tab', async ({ page }) => {
    
  const faceMatchingTab = page.locator('nav').getByText('Face matching').first();
  await expect(faceMatchingTab).toBeVisible();
  await faceMatchingTab.click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: ' Upload a file' }).last().click();
    
    try {
        const confirmBtn = page.getByRole('button', { name: 'Confirm' }).first();
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();
    } catch (e) {
        console.log('you didnt click on Confirm');
    }
    

    
    const fileChooser = await fileChooserPromise;
    const filePath = path.resolve(__dirname, '../fixtures/woman_face.png');
    await fileChooser.setFiles(filePath);
    
    
    const uploadedImage = page.locator('img[alt$="woman_face.png"]');
    await expect(uploadedImage).toBeVisible();
});


test('Checking uploads of identical photos in the Face matching tab', async ({ page }) => {
    
  const faceMatchingTab = page.locator('nav').getByText('Face matching').first();
  await expect(faceMatchingTab).toBeVisible();
  await faceMatchingTab.click();
  const fileChooserPromise1 = page.waitForEvent('filechooser');
    
    await page.getByRole('button', { name: ' Upload a file' }).first().click();
    try {
        const confirmBtn = page.getByRole('button', { name: 'Confirm' }).first();
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();
    } catch (e) {
        console.log('файл не был загружен');
    }
    const fileChooser1 = await fileChooserPromise1;
    const filePath1 = path.resolve(__dirname, '../fixtures/woman_face.png');
    await fileChooser1.setFiles(filePath1);
    

    const fileChooserPromise2 = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: ' Upload a file' }).last().click();
    try {
        const confirmBtn = page.getByRole('button', { name: 'Confirm' }).first();
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();
    } catch (e) {
        console.log('you didnt click on Confirm');
    }
    const fileChooser2 = await fileChooserPromise2;
    const filePath2 = path.resolve(__dirname, '../fixtures/woman_face.png');
    await fileChooser2.setFiles(filePath2);

    
    const statusMessage = page.getByTestId('data-key-pairmsg');
    await expect(statusMessage).toContainText('FACER_OK', { timeout: 5000 });

    
});
});

