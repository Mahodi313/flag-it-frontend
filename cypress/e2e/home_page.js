import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: User visits the home page
Given("I open the home page", () => {
  cy.visit("/");
});

Then("I should see the {string}", (title) => {
  cy.contains("h3", title).should("be.visible");
});

// Scenario: User is logging in
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

// Scenario: Logged in user visits QuizStart page through desktop Navbar
Given("I am logged in now", () => {
  cy.visit("/login");
  cy.get("#username").clear().type("UserName");
  cy.get("#password").clear().type("Test@123");
  cy.get(".formbuttonContainer button").click().wait(400);
});

When("I press the Quiz-option in desktop Navbar", () => {
  cy.get("#nav-middle").contains("Quiz").click();
});

Then("I should navigate to {string}", () => {
  cy.url().should("include", "/quizstart");
});

// Scenario: Signed out user visits QuizStart page through desktop Navbar
Given("I am signed out", () => {
  cy.visit("/login");
  cy.get("#username").clear().type("UserName");
  cy.get("#password").clear().type("Test@123");
  cy.get(".formbuttonContainer button").click().wait(400);

  cy.get("a.logoutLink").click();
});

When("I press the Quiz option in desktop Navbar", () => {
  cy.get("#nav-middle").contains("Quiz").click().wait(400);
});

Then("the URL should be {string}", (url) => {
  cy.url().should("include", url);
});

// Scenario: Logged in user visits QuizStart page through mobile Navbar
Given("I am logged in", () => {
  cy.visit("/login");
  cy.get("#username").clear().type("UserName");
  cy.get("#password").clear().type("Test@123");
  cy.get(".formbuttonContainer button").click().wait(400);
});

When("I open up the hamburger menu in mobile Navbar", () => {
  cy.viewport("iphone-6");
  cy.get(".hamburger").click();
});

When("I press the Quiz option in desktop Nav-bar", () => {
  cy.get(".mobile-nav-item").contains("Quiz").click();
});

Then('the URL should be "/quizstart"', () => {
  cy.url().should("include", "/quizstart");
});

Then('the URL should be "/login"', () => {
  cy.url().should("include", "/login");
});

// Scenario: Logged in user visits QuizStart page through home page button
When('I press the "Gå till quiz"-button on home page', () => {
  cy.get(".primary-btn").contains("Gå till Quiz").click();
});

Then('the URL should be "/quizstart"', () => {
  cy.url().should("include", "/quizstart");
});

// Scenario: Signed out user visits QuizStart page through home page button
Then('the URL should be "/login"', () => {
  cy.url().should("include", "/login");
});

// Scenario: Logged in user visits QuizStart page through Footer
When("I press the Quiz option in the Footer", () => {
  cy.get("#footer-right-container").contains("Quiz").click();
});

Then('the URL should be "/quizstart"', () => {
  cy.url().should("include", "/quizstart");
});

// Scenario: Signed out user visits QuizStart page through Footer

Then('the URL should be "/login"', () => {
  cy.url().should("include", "/login");
});

// Scenario: User visits the World page
When("I navigate to world page", () => {
  cy.get("#nav-middle").contains("Världens Flaggor").click();
});

Then("I should see the title {string}", () => {
  cy.contains("Se Världens Flaggor!");
});

// Scenario: User visits register page
When("I navigate to register page", () => {
  cy.visit("/register");
});

Then('I should see title "Registrera dig"', () => {
  cy.contains("Registrera dig");
});

// Scenario: User visits login page
When("I navigate to login page", () => {
  cy.visit("/login");
});

Then('I should spot the "Logga in"', () => {
  cy.contains("Logga in");
});
