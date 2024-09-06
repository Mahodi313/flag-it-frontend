import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Reusing the login step
Given(
  "I am logged in as {string} with password {string}",
  (username, password) => {
    cy.visit("/login");
    cy.get("#username").clear().type(username);
    cy.get("#password").clear().type(password);
    cy.contains("button", "Logga in").click();
    cy.url().should("eq", "http://localhost:5173/");
    cy.get("a.logoutLink").should("be.visible").and("contain", "Logga ut");
  }
);

Given("I am not logged in", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given("I am on the quiz start page", () => {
  cy.visit("/quizstart");
});

When("I navigate to the quiz start page", () => {
  cy.visit("/quizstart");
});

When("I select {string} difficulty", (difficulty) => {
  // Debugging output
  cy.log(`Selecting difficulty: ${difficulty}`);
  cy.contains("label", difficulty).should("be.visible").then($label => {
    cy.wrap($label).find("input").check();
  });
});

When("I click on {string}", (buttonText) => {
  cy.contains("button", buttonText).click();
});

Then("I should see the quiz start information", () => {
  cy.contains("Välkommen till Quizet!").should("be.visible");
  cy.contains("Här kommer information om quizet att synas").should("be.visible");
});

Then("I should be navigated to the quiz page with difficulty {string}", (difficulty) => {
  const difficultyMap = {
    "Lätt": "easy",
    "Mellan": "normal",
    "Svår": "hard"
  };
  // Debugging output
  cy.log(`Difficulty passed: ${difficulty}`);
  cy.log(`Mapped difficulty: ${difficultyMap[difficulty]}`);
  cy.url().should("include", `/quiz/${difficultyMap[difficulty]}`);
});

Then("I should be redirected to the login page", () => {
  cy.url().should("include", "/login");
});