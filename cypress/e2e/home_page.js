import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the home page", () => {
  cy.visit("/");
});

Then("I should see the {string}", (title) => {
  cy.contains("h3", title).should("be.visible");
});
