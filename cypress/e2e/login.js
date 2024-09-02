import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step to visit the login page
Given("I open the login page", () => {
  cy.visit("/login"); // Ensure this matches the actual route for your login page
});

// Step to enter text into input fields
When('I type {string} in "#username"', (text) => {
  cy.get("#username").clear().type(text);
});

When('I type {string} in "#password"', (text) => {
  cy.get("#password").clear().type(text);
});

// Step to click the login button
When("I click on the login button", () => {
  cy.get(".formbuttonContainer button").click(); // Adjust the class name accordingly
});

// Step to check if the user is redirected to the homepage
Then("I should be redirected to homepage", () => {
  cy.url().should("include", "/").and("eq", "http://localhost:5173/");
});

// Step to verify the logout button is visible
Then("I should see the logout button in the navigation", () => {
  // Wait for the page to reflect the logged-in state
  cy.get("a.logoutLink").should("be.visible").and("contain", "Logga ut");
});
