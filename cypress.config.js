import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor"; // Default import
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Create a bundler with the necessary plugins
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      // Set up file preprocessor using the bundler
      on("file:preprocessor", bundler);

      // Add Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Return the updated config object
      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "http://localhost:5173/", // Adjust baseUrl to match your Vite development server port
  },
});
