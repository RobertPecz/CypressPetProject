import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.ts",
    baseUrl: 'http://www.automationpractice.pl',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
