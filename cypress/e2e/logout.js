import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step to visit the login page
Given("I open the login page", () => {
  cy.visit("/login");
});

// Steps to enter username and password
When('I type {string} in "#username"', (text) => {
  cy.get("#username").clear().type(text);
});

When('I type {string} in "#password"', (text) => {
  cy.get("#password").clear().type(text);
});

// Step to click the login button
When("I click on the login button", () => {
  cy.get(".formbuttonContainer button").click();
});

// Step to check if the user is redirected to the homepage
Then("I should be redirected to homepage", () => {
  cy.url().should("include", "/").and("eq", "http://localhost:5173/");
});

// Step to verify the logout button is visible
Then("I should see the logout button in the navigation", () => {
  cy.get("a.logoutLink").should("be.visible").and("contain", "Logga ut");
});

// Step to click the logout button
When("I click on the logout button", () => {
  cy.get("a.logoutLink").click();
});

Then("I should see login and register button links", () => {
  cy.get("#loginLink").should("be.visible").and("contain", "Logga in");
  cy.get("#RegisterLink").should("be.visible").and("contain", "Registrera");
});
