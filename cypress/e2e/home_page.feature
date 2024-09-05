Feature: Home Page

Scenario: User visits the home page
  Given I open the home page
  Then I should see the "Put a flag on it!"

Scenario: User is logging in
  Given I open the login page
  When I type "UserName" in "#username"
  And I type "Test@123" in "#password"
  And I click on the login button
  Then I should be redirected to homepage

Scenario: Logged in user visits QuizStart page through desktop Navbar
  Given I am logged in now
  When I press the Quiz-option in desktop Navbar
  Then I should navigate to "/quizstart"

Scenario: Signed out user visits QuizStart page through desktop Navbar
  Given I am signed out
  When I press the Quiz option in desktop Navbar
  Then the URL should be "/login"

Scenario: Logged in user visits QuizStart page through mobile Navbar
  Given I am logged in
  When I open up the hamburger menu in mobile Navbar
  And I press the Quiz option in desktop Nav-bar
  Then the URL should be "/quizstart"

Scenario: Signed out user visits QuizStart page through mobile Navbar
  Given I am signed out
  When I open up the hamburger menu in mobile Navbar
  And I press the Quiz option in desktop Nav-bar
  Then the URL should be "/login"

Scenario: Logged in user visits QuizStart page through home page button
  Given I am logged in
  When I press the "Gå till quiz"-button on home page
  Then the URL should be "/quizstart"

Scenario: Signed out user visits QuizStart page through home page button
  Given I am signed out
  When I press the "Gå till quiz"-button on home page
  Then the URL should be "/login"

Scenario: Logged in user visits QuizStart page through Footer
  Given I am logged in
  When I press the Quiz option in the Footer
  Then the URL should be "/quizstart"

Scenario: Signed out user visits QuizStart page through Footer
  Given I am signed out
  When I press the Quiz option in the Footer
  Then the URL should be "/login"

Scenario: User visits the World page
  Given I open the home page
  When I navigate to world page
  Then I should see the title "Se Världens Flaggor!"

Scenario: User visits register page
  Given I am signed out
  When I navigate to register page
  Then I should see title "Registrera dig"

Scenario: User visits login page
  Given I am signed out
  When I navigate to login page
  Then I should spot the "Logga in"


