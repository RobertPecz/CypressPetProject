const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.ts",
    baseUrl: 'http://www.automationpractice.pl',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },  
  },
});
