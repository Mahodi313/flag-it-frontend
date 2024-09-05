import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.visit("/login");
});

When('I type {string} in "#username"', (text) => {
  cy.get("#username").clear().type(text);
});

When('I type {string} in "#password"', (text) => {
  cy.get("#password").clear().type(text);
});

When("I click on the login button", () => {
  cy.get(".formbuttonContainer button").click();
});

Then("I should be redirected to homepage", () => {
  cy.url().should("include", "/").and("eq", "http://localhost:5173/");
});

Then("I should see the logout button in the navigation", () => {
  cy.get("a.logoutLink").should("be.visible").and("contain", "Logga ut");
});

When("I click on the logout button", () => {
  cy.get("a.logoutLink").click();
});

Then("I should see login and register button links", () => {
  cy.get("#loginLink").should("be.visible").and("contain", "Logga in");
  cy.get("#RegisterLink").should("be.visible").and("contain", "Registrera");
});
