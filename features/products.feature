Feature: Univ Stationery Product Management

  Background:
    Given the following stationery products:
      | name                  | category     | available |
      | Blue Pen              | Writing      | true      |
      | College Notebook      | Paper        | true      |
      | Scientific Calculator | Electronics  | true      |
      | Premium Backpack      | Accessories  | false     |

  Scenario: Read a Product
    When I visit the "Home Page"
    And I set the "Name" to "Scientific Calculator"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Scientific Calculator" in the "Name" field
    And I should see "Electronics" in the "Category" field
    And I should see "true" in the "Available" dropdown

  Scenario: Update a Product
    When I visit the "Home Page"
    And I set the "Name" to "Blue Pen"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Writing" in the "Category" field
    When I change "Category" to "Office"
    And I press the "Update" button
    Then I should see the message "Success"
    When I copy the "Id" field
    And I press the "Clear" button
    And I paste the "Id" field
    And I press the "Retrieve" button
    Then I should see the message "Success"
    And I should see "Office" in the "Category" field
    When I press the "Clear" button
    And I press the "Search" button
    Then I should see "Office" in the results

  Scenario: Delete a Product
    When I visit the "Home Page"
    And I set the "Name" to "College Notebook"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Paper" in the "Category" field
    When I copy the "Id" field
    And I press the "Clear" button
    And I paste the "Id" field
    And I press the "Delete" button
    Then I should see the message "Product has been Deleted!"
    When I press the "Clear" button
    And I press the "Search" button
    Then I should not see "College Notebook" in the results

  Scenario: List All Products
    When I visit the "Home Page"
    And I press the "Clear" button
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Blue Pen" in the results
    And I should see "College Notebook" in the results
    And I should see "Scientific Calculator" in the results
    And I should see "Premium Backpack" in the results

  Scenario: Search for a Product by Category
    When I visit the "Home Page"
    And I press the "Clear" button
    And I select "Paper" in the "Category" dropdown
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "College Notebook" in the results
    And I should not see "Blue Pen" in the results
    And I should not see "Scientific Calculator" in the results
    And I should not see "Premium Backpack" in the results

  Scenario: Search for a Product by Name
    When I visit the "Home Page"
    And I press the "Clear" button
    And I set the "Name" to "Blue Pen"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Blue Pen" in the results
    And I should not see "College Notebook" in the results
    And I should not see "Scientific Calculator" in the results
    And I should not see "Premium Backpack" in the results

  Scenario: Search for a Product by Availability
    When I visit the "Home Page"
    And I press the "Clear" button
    And I select "True" in the "Available" dropdown
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Blue Pen" in the results
    And I should see "College Notebook" in the results
    And I should see "Scientific Calculator" in the results
    And I should not see "Premium Backpack" in the results