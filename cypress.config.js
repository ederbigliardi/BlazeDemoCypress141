const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportHeight: 1080, // altura em pixels
    viewportWidth: 1920, // largura em pixels --> Full HD
    baseUrl: 'https://blazedemo.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
