Feature: World Page
 
  Scenario: Load all countries and verify the initial view
    Given I open the world page
    Then I should see 6 countries initially
 
  Scenario: Filter countries by continent
    Given I open the world page
    When I filter by "Europa"
    Then I should see only European countries
 
  Scenario: Load more countries with "See more" button
    Given I open the world page
    When I click the "Se mer" button
    Then I should see more than 6 countries
 
  Scenario: View country details
    Given I open the world page
    When I click on a country
    Then I should be redirected to the country detail page


