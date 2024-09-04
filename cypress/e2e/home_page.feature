Feature: Home Page

Scenario: User visits the home page
  Given I open the home page
  Then I should see the "Put a flag on it!"

Scenario: Logged in user visits QuizStart page through desktop Navbar
  Given I am logged in
  When I press the Quiz option in Navbar
  Then the URL should be "/quizstart"

Scenario: Logged in user visits QuizStart page through mobile Navbar

Scenario: Signed out user visits QuizStart page through mobile Navbar

Scenario: Logged in user visits QuizStart page through home page button

Scenario: Signed out user visits QuizStart page through home page button

Scenario: Logged in user visits QuizStart page through Footer

Scenario: Signed out user visits QuizStart page through Footer

Scenario: User visits the World page

Scenario: User visits register page

Scenario: User visits login page


