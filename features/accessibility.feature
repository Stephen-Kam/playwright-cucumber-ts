Feature: Accessibility
  As a user
  I want pages to meet accessibility standards
  So that the site is usable by everyone

  @accessibility
  Scenario: Scan example.com for accessibility violations
    Given I navigate to "https://example.com"
    Then the page should have no accessibility violations
