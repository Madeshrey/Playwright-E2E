// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import path from 'path';

const resultsDir = path.resolve('./', 'PLAYWRIGHT PROJECT');  // Static results directory name
module.exports = defineConfig({
  testDir: './test',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,  // Removed CI-related check
  timeout: 60 * 1000,
  globalTeardown: 'scripts/setup/globalTeardown.js',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list', { printSteps: true }],
    ['json', { outputFile: 'results.json' }],
    ['html', {
      open: 'never',
      outputFolder: resultsDir,
    }],
  ],
  use: {
    trace: 'on',
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefox',
      use: {
        channel: 'firefox',
        ...devices['Desktop Firefox'],
        viewport: { height: 1080, width: 1920 },
        launchOptions: {
          args: ["--kiosk", "--no-sandbox"],
          headless: false,
        },
      },
    },
    {
      name: 'msedge',
      use: {
        channel: 'msedge',
        ...devices['Desktop Edge'],
        viewport: { height: 1080, width: 1920 },
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: 'googlechrome',
      use: {
        channel: 'chrome',
        ...devices['Desktop Chrome'],
        viewport: { height: 720, width: 1280 },
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
