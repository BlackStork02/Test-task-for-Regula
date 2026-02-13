// @ts-check
const {defineConfig, devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    timeout: 30000,
    expect: {
        timeout: 10000
    },
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', {outputFolder: 'playwright-report/html-report'}],
        ['junit', {outputFile: 'playwright-report/junit.xml'}],
        ['list']
    ],
    outputDir: 'playwright-report/test-results',
    globalSetup: './tests/global-setup.js',
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://faceapi.regulaforensics.com/',
        trace: 'on-first-retry',
        //screenshot: 'only-on-failure',
        screenshot: 'on',
        video: 'on-first-retry',
        ignoreHTTPSErrors: true,
        //bypassCSP: true,
        //javaScriptEnabled: true,
    },
    projects: [
        // Standard projects without authentication
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']}
        },
        // In the CI environment, we run only Chrome to speed up tests
        // ...(!process.env.CI ? [
        //     {
        //         name: 'firefox',
        //         use: { ...devices['Desktop Firefox'] },
        //         testIgnore: /.*\.auth\.spec\.js/
        //     },
        //     {
        //         name: 'webkit',
        //         use: { ...devices['Desktop Safari'] },
        //         testIgnore: /.*\.auth\.spec\.js/
        //     },
        //     // Mobile browsers
        //     {
        //         name: 'Mobile Chrome',
        //         use: { ...devices['Pixel 7'] },
        //         testIgnore: /.*\.auth\.spec\.js/
        //     },
        //     {
        //         name: 'Mobile Safari',
        //         use: { ...devices['iPhone 15 Pro'] },
        //         testIgnore: /.*\.auth\.spec\.js/
        //     },
        // ] : []),
    ],
});
