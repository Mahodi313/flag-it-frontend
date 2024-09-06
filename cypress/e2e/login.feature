Feature: Login 

Scenario: Successful login redirects to homepage and shows logout button
Given I open the login page
When I type "admin" in "#username"
And I type "Admin@1234" in "#password"
And I click on the login button
Then I should be redirected to homepage
Then I should see the logout button in the navigation