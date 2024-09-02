import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const uniqueId = () => Math.floor(Math.random() * 100000);

Given("I open the register page", () => {
  cy.visit("/register");
});

When("I type a unique username in {string}", (selector) => {
  const uniqueUsername = `User${uniqueId()}`;
  cy.get(selector).clear().type(uniqueUsername);
});

When("I type a unique email in {string}", (selector) => {
  const uniqueEmail = `test${uniqueId()}@live.se`;
  cy.get(selector).clear().type(uniqueEmail);
});

When("I type {string} in {string}", (text, selector) => {
  cy.get(selector).clear().type(text);
});

When("I click on the register button", () => {
  cy.get(".formbuttonContainer button").click();
});

Then("I should be redirected to login page", () => {
  cy.url().should("include", "/login");
});
