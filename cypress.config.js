const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },  
  },
});
