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

Given("I have some history data", () => {
  cy.intercept("GET", "**/api/Result/user/*", {
    statusCode: 200,
    body: [
      {
        points: 10,
        timeOfCompletion: "00:05:00",
        difficulty: "Easy",
        dateOfResult: new Date().toISOString(),
      },
      {
        points: 15,
        timeOfCompletion: "00:04:00",
        difficulty: "Normal",
        dateOfResult: new Date().toISOString(),
      },
    ],
  }).as("getHistoryData");
});

// Mocking no history data for the current user
Given("I have no history data", () => {
  cy.intercept("GET", "**/api/Result/user/*", {
    statusCode: 200,
    body: [],
  }).as("getHistoryData");
});

When("I navigate to the history page", () => {
  cy.visit("/history");
  cy.wait("@getHistoryData");
});

When("I click on the {string} filter button", (difficulty) => {
  cy.contains("button", difficulty).click();
  cy.wait(500);
});

Then("I should see my history data", () => {
  cy.get(".history-table tbody tr").should("have.length.greaterThan", 0);
});

Then("I should see only entries with difficulty {string}", (difficulty) => {
  cy.get(".history-table tbody tr").each(($row) => {
    cy.wrap($row).find("td").eq(2).should("contain", difficulty); // Assuming the difficulty is in the third column
  });
});

Then("I should see a message {string}", (message) => {
  cy.get(".noHistoryP").should("contain", message);
});
