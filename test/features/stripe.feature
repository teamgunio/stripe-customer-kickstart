Feature: Setup Customer Payment Info in Stripe
  In order to setup a customer
  As a developer
  I want to create or update a customer in Stripe

  Background:
    Given a valid payment token
    And a customer
    
  Scenario: Adding Payment Method for a New Customer
    When the customer does not exist in Stripe
    Then a new customer should be created in Stripe

  Scenario: Adding Payment Method for an Existing Customer
    When the customer exists in Stripe
    Then the customer should be updated in Stripe
    But a new customer should not be created in Stripe
