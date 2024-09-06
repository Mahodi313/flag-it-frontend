Feature: Quiz Start Page

  Background:
    Given I am logged in as "leo123" with password "Leo12345!"

  Scenario: Viewing quiz start page
    Given I am on the quiz start page
    Then I should see the quiz start information

  Scenario: Selecting difficulty and starting quiz
    Given I am on the quiz start page
    When I select "Lätt" difficulty
    And I click on "Start Quiz"
    Then I should be navigated to the quiz page with difficulty "Lätt"

    Scenario: Not logged in and trying to access quiz start page
    Given I am not logged in
    When I navigate to the quiz start page
    Then I should be redirected to the login page