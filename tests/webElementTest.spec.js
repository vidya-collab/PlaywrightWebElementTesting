import { test, expect } from '@playwright/test';

//Imports the Playwright test runner and the expect assertion library.

import path from 'path'; 

//Imports Node.js’ built-in path module.

//Will be used later for handling file paths (for upload/download tests).
 
test.describe('Web Elements Practice The Internet (herokuapp)', () => {
  test('Login, inputs, dropdown, checkboxes, hover, drag&drop, upload, download, alerts', async ({ page, context }) => {
  
    //tests.describe ..Groups related tests under a suite name "Web Elements Practice – The Internet (herokuapp)".

    //Makes the report and logs more structured.

    //Playwright injects fixtures into the function:

    // page: a fresh browser tab for interacting with the app.

    //context: the browser context (like a profile with cookies, storage, etc.).

    // ---------- 1) LOGIN (form authentication) ----------
    await page.goto('/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // ---------- 2) TYPE / PRESS ----------
    await page.keyboard.press('Control+A'); // just to practice shortcuts while focused on page
    await page.keyboard.press('Escape');

    // ---------- 3) DROPDOWN ----------
    await page.goto('/dropdown');
    // By value
    await page.selectOption('#dropdown', { value: '1' });
    await expect(page.locator('#dropdown')).toHaveValue('1');
    // By label
    await page.selectOption('#dropdown', { label: 'Option 2' });
    await expect(page.locator('#dropdown')).toHaveValue('2');

    // ---------- 4) CHECKBOXES ----------
    await page.goto('/checkboxes');
    const boxes = page.locator('input[type="checkbox"]');
    // Force known state
    if (!(await boxes.nth(0).isChecked())) await boxes.nth(0).check();
    if (await boxes.nth(1).isChecked()) await boxes.nth(1).uncheck();
    await expect(boxes.nth(0)).toBeChecked();
    await expect(boxes.nth(1)).not.toBeChecked();

/**** 
    // ---------- 5) HOVER ----------
    await page.goto('/hovers');
    // Hover first avatar and assert caption appears
    const firstFigure = page.locator('.figure').first();
    await firstFigure.hover();
    await expect(firstFigure.locator('.figcaption')).toBeVisible();

    // ---------- 6) DRAG & DROP ----------
    await page.goto('/drag_and_drop');
    const boxA = page.locator('#column-a');
    const boxB = page.locator('#column-b');
    // Drag A → B (HTML5)
    await boxA.dragTo(boxB);
    // After drag, headings should swap (A/B labels change)
    const aHeader = await boxA.locator('header').innerText();
    const bHeader = await boxB.locator('header').innerText();
    // One should be 'B' now and the other 'A'
    expect(new Set([aHeader.trim(), bHeader.trim()])).toEqual(new Set(['A', 'B']));

    // ---------- 7) FILE UPLOAD ----------
    await page.goto('/upload');
    const filePath = path.resolve('tests/data/sample.txt');
    await page.setInputFiles('input#file-upload', filePath);
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');

    // ---------- 8) FILE DOWNLOAD ----------
    await page.goto('/download');
    // Click the first file link and capture download
    const firstFile = page.locator('a[href^="/download/"]').first();
    const download = await Promise.all([
      page.waitForEvent('download'),
      firstFile.click()
    ]).then(([d]) => d);
    const savedPath = await download.path();
    expect(savedPath).toBeTruthy(); // Download completed locally (in temp)
    // Optionally persist to project folder:
    await download.saveAs(path.resolve('tests/data/downloaded-file'));

    // ---------- 9) ALERTS & DIALOGS ----------
    await page.goto('/javascript_alerts');

    // Simple alert -> Accept
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    await page.click('text=Click for JS Alert');
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

    // Confirm -> Dismiss
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    await page.click('text=Click for JS Confirm');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

    // Prompt -> Accept with text
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Playwright Rocks!');
    });
    await page.click('text=Click for JS Prompt');
    await expect(page.locator('#result')).toContainText('Playwright Rocks!');

    // ---------- 10) EXTRA: Press keys on a text input ----------
    await page.goto('/inputs');
    const numberInput = page.locator('input[type="number"]');
    await numberInput.click();
    await page.keyboard.type('123');
    await expect(numberInput).toHaveValue('123');
    await page.keyboard.press('Control+A');
    await page.keyboard.type('456');
    await expect(numberInput).toHaveValue('456');

    // Done!**/
  
})
});