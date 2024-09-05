Feature: Logout

Background:
Given I open the login page
When I type "UserName" in "#username"
And I type "Test@123" in "#password"
And I click on the login button
Then I should be redirected to homepage
Then I should see the logout button in the navigation

Scenario: Successful logout should make me see the login & register links again
When I click on the logout button
Then I should see login and register button links
