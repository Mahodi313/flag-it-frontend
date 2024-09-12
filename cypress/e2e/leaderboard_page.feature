Feature: Leaderboard page
        

    Scenario: Clicking buttons and filtering data
        Given I am on the Leaderboard page
        When I click on the "Lätt" filter button
        Then I should see only entries with difficulty "Easy"
        When I click on the "Mellan" filter button
        Then I should see only entries with difficulty "Normal"
        When I click on the "Svår" filter button
        Then I should see only entries with difficulty "Hard"