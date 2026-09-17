Feature: Example search
  As a user
  I want to verify a page loads and has the expected title
  So that I know the test setup works end to end

  Scenario: Visit example.com
    Given I navigate to "https://example.com"
    Then the page title should contain "Example"
