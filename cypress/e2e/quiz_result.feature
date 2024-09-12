Feature: Quiz_Result page

 Background:
     Given I am logged in as "admin" with password "Admin@1234"
    And I am on the quiz start page



Scenario: Selecting difficulty and starting the quiz as logged in
    Given I am on the quiz start page
    When I select "Lätt" difficulty
    And I click on "Start Quiz"
    Then I should be navigated to the quiz page with difficulty "Lätt"


Scenario: Navigate to result page as logged in 
    Given I am on the quiz page with difficulty "Lätt"
    When I answer the first question
    And I click on the button "Nästa"
    Then I should see the next question 
    When I answer rest of the questions
    Then I should see the result page
    And I can see the "quizData" in localstorage

Scenario: Redirected to quizstart page as logged in
    Given I am on the quiz page with difficulty "Lätt"
    When I answer the first question
    And I click on the button "Nästa"
    Then I should see the next question 
    When I answer rest of the questions
    Then I should see the result page
    And I can see the "quizData" in localstorage
    
    When I click on "Spela igen" button
    Then I should redirect to QuizStart page
    When I visit "/result" in the url
    Then I should see result page
    When I visit "/quiz/Easy" in the url
    Then I should redirect to QuizStart page
    When I visit "/result" in the url
    Then I should redirect to QuizStart page
    

Scenario: Redirected to login page as signed out  
    Given I am logged in as "admin" with password "Admin@1234"
    And I am on the quiz start page
    When I click on the "Logga ut"
    Then I should be logged out and redirected to the login page
    When I visit "/result" in the url
    Then I should be redirected to the login page
    When I visit "/quiz/Easy" in the url
    Then I should be redirected to the login page


    
