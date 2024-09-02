Feature: Register

Scenario: Successful register redirects to login page 
Given I open the register page
When I type a unique username in "#username"
When I type a unique email in "#email"
And I type "Test@123" in "#password"
And I type "Test@123" in "#confirmPassword"
And I click on the register button
Then I should be redirected to login page
