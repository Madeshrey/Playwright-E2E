// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const resultsDir = path.resolve('./', 'PLAYWRIGHT_PROJECT'); // Static results directory name

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0, // Retries twice in CI
  workers: process.env.CI ? 1 : undefined, // Single worker in CI, parallel locally
  timeout: 60 * 1000,
  reporter: [
    ['list', { printSteps: true }],
    ['json', { outputFile: 'results.json' }],
    ['html', {
      open: 'never',
      outputFolder: resultsDir,
    }],
  ],
  use: {
    trace:'on-first-retry',
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    waitUntil: 'domcontentloaded',
    video:'on-first-retry'
  },
  projects: [
    {
      name: 'firefox',
      use: {
        channel: 'firefox',
        ...devices['Desktop Firefox'],
        viewport: { height: 1080, width: 1920 },
        launchOptions: {
          args: ["--kiosk", "--no-sandbox"],
          headless: true,  // Runs in headless mode
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
          headless: true,  // Runs in headless mode
        },
      },
    },
    {
      name: 'googlechrome',
      use: {
        channel: 'chrome',
        ...devices['Desktop Chrome'],
        viewport: { height: 720, width: 1280 },
        headless: false,  // Runs in visible mode
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
