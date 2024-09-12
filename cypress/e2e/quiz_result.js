import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Backrgound

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

Given("I am on the quiz start page", () => {
  cy.visit("/quizstart");
});

// Scenario: Selecting difficulty and starting the quiz as logged in

When("I select {string} difficulty", (difficulty) => {
  cy.log(`Selecting difficulty: ${difficulty}`);
  cy.contains("label", difficulty)
    .should("be.visible")
    .then(($label) => {
      cy.wrap($label).find("input").check();
    });
});

When("I click on {string}", (buttonText) => {
  cy.contains("button", buttonText).click();
});

Then(
  "I should be navigated to the quiz page with difficulty {string}",
  (difficulty) => {
    const difficultyMap = {
      Lätt: "Easy",
      Mellan: "Normal",
      Svår: "Hard",
    };
    // Debugging output
    cy.log(`Difficulty passed: ${difficulty}`);
    cy.log(`Mapped difficulty: ${difficultyMap[difficulty]}`);
    cy.url().should("include", `/quiz/${difficultyMap[difficulty]}`);
  }
);

// Scenario: Navigate to result page as logged in

Given("I am on the quiz page with difficulty {string}", (difficulty) => {
  cy.visit("/quizstart");
  cy.log(`Selecting difficulty: ${difficulty}`);
  cy.contains("label", difficulty)
    .should("be.visible")
    .then(($label) => {
      cy.wrap($label).find("input").check();
      cy.contains("button", "Start Quiz").click();
    });
});

When("I answer the first question", () => {
  cy.get("#option-0").click();
});

When("I click on the button {string}", (content) => {
  cy.contains("button", content).click();
});

Then("I should see the next question", () => {
  cy.get("#quiz-count").should("have.text", "2 / 15");
});

When("I answer rest of the questions", () => {
  for (let i = 0; i < 14; i++) {
    cy.get("#option-0").click();
    cy.contains("button", "Nästa").click();
    cy.wait(500);
  }
});

Then("I should see the result page", () => {
  cy.get(".result-page > h2").should("have.text", "Resultat");
  cy.url().should("include", "/result");
});

Then("I can see the {string} in localstorage", (quizData) => {
  cy.window().then((win) => {
    const storedData = win.localStorage.getItem(quizData);
    expect(storedData).to.not.be.null;
  });
});

// Scenario: Redirected to quizstart page as logged in
When("I click on {string} button", () => {
  cy.get(`.result-details > [href="/quizstart"]`).click();
});

Then("I should redirect to QuizStart page", () => {
  cy.url().should("include", "/quizstart");
});

When("I visit {string} in the url", (url) => {
  cy.visit(url);
});
