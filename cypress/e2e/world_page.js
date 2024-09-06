import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the world page", () => {
  cy.visit("/world");
});

Then("I should see {int} countries initially", (count) => {
  cy.get(".grid-container .spec-item").should("have.length", count);
});

When("I filter by {string}", (continent) => {
  cy.contains(continent).click();
});

Then("I should see only European countries", () => {
  const europeanCountries = [
    "Albanien",
    "Andorra",
    "Armenien",
    "Österrike",
    "Azerbajdzjan",
    "Vitryssland",
    "Belgien",
    "Bosnien och Hercegovina",
    "Bulgarien",
    "Kroatien",
    "Cypern",
    "Tjeckien",
    "Danmark",
    "Estland",
    "Finland",
    "Frankrike",
    "Georgien",
    "Tyskland",
    "Grekland",
    "Ungern",
    "Island",
    "Irland",
    "Italien",
    "Kazakhstan",
    "Kosovo",
    "Lettland",
    "Liechtenstein",
    "Litauen",
    "Luxemburg",
    "Malta",
    "Moldavien",
    "Monaco",
    "Montenegro",
    "Nederländerna",
    "Nordmakedonien",
    "Norge",
    "Polen",
    "Portugal",
    "Rumänien",
    "Ryssland",
    "San Marino",
    "Serbien",
    "Slovakien",
    "Slovenien",
    "Spanien",
    "Sverige",
    "Schweiz",
    "Turkiet",
    "Ukraina",
    "Storbritannien",
    "Vatikanstaten",
  ];

  cy.get(".grid-container .spec-item").each(($el) => {
    cy.wrap($el)
      .invoke("text")
      .then((text) => {
        const countryName = text.trim();
        expect(europeanCountries).to.include(countryName);
      });
  });
});

When("I click the {string} button", (buttonText) => {
  cy.contains("button", buttonText).click();
});

Then("I should see more than {int} countries", (count) => {
  cy.get(".grid-container .spec-item").should("have.length.greaterThan", count);
});

When("I click on a country", () => {
  cy.get(".grid-container .spec-item").first().click();
});

Then("I should be redirected to the country detail page", () => {
  cy.url().should("include", "/Worlditem/");
});
