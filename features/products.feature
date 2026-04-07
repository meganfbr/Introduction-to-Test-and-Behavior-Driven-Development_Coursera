Feature: Univ Stationery Product Management

  Background:
    Given the following stationery products:
      | name                  | category     | available |
      | Blue Pen              | Writing      | true      |
      | College Notebook      | Paper        | true      |
      | Scientific Calculator | Electronics  | true      |
      | Premium Backpack      | Accessories  | false     |

  Scenario: List All
    When I request all stationery products
    Then I should see a list containing 4 products

  Scenario: Search by Name
    When I search stationery by name "Blue Pen"
    Then I should find exactly 1 product named "Blue Pen"

  Scenario: Search by Category
    When I search stationery by category "Paper"
    Then I should find exactly 1 product in the "Paper" category

  Scenario: Search by Availability
    When I search stationery by availability "false"
    Then I should find exactly 1 unavailable product

  Scenario: Read
    When I request a stationery product named "Scientific Calculator"
    Then I should see the product details with name "Scientific Calculator"

  Scenario: Update
    When I update the available status to "true" for stationery named "Premium Backpack"
    Then the product named "Premium Backpack" should have availability "true"

  Scenario: Delete
    When I delete the stationery named "College Notebook"
    Then I should not find "College Notebook" in the list of products