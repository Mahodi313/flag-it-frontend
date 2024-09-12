Feature: Quiz_Result page

Background:
    Given I am logged in as "admin" with password "Admin@1234"
    And I am on the quiz start page



Scenario: Selecting difficulty and starting the quiz as logged in
    Given I am on the quiz start page
    When I select "Lätt" difficulty
    And I click on "Start Quiz"
    Then I should be navigated to the quiz page with difficulty "Lätt"




    Scenario: Doing the quiz
    Given I am on the quiz page with difficulty "Lätt"
    When I click on the correct answer 
    And I click on the button "Nästa"
    Then I should see the next question 





    Scenario: Navigate to result page as logged in 
    Given I am on the quiz page with difficulty "Lätt"
    When I answer all the question
    And I click on the button "Nästa"
    Then I should navigate to result page
    And I can see the quiz data in localstorage
    And I can see the results






    




    
