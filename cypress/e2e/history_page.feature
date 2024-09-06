Feature: History Page

  Background:
    Given I am logged in as "User12" with password "Test@123"

  Scenario: Viewing history data
    Given I have some history data
    When I navigate to the history page
    Then I should see my history data

  Scenario: Filtering history data by difficulty
    Given I have some history data
    When I navigate to the history page
    And I click on the "Lätt" filter button
    Then I should see only entries with difficulty "Easy"

  Scenario: No history data available
    Given I have no history data
    When I navigate to the history page
    Then I should see a message "Ingen historik tillgänglig."
