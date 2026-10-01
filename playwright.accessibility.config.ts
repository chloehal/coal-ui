import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig(base, {
  testMatch: "accessibility.spec.ts",
  timeout: 600000,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/accessibility.json" }],
  ],
});
