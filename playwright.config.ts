import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "browser.spec.ts",
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3100",
    headless: true,
    channel: "chrome",
    viewport: { width: 1440, height: 1000 },
  },
  reporter: "list",
});
