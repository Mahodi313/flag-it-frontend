import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Leaderboard page", () => {
  cy.visit("/leaderboard"); 
});

When('I click on the {string} filter button', (buttonText) => {
  cy.get('.difficultyDiv button').contains(buttonText).click();
});

Then('I should see only entries with difficulty {string}', (difficulty) => {
    cy.get('.difficultyH2').should('contain', difficulty);
});