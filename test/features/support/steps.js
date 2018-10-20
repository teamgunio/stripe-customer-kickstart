const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

import {
  findCustomerByEmail,
  addCustomerPaymentMethod
} from '../../../server/service/stripe'

let token = null
let customer = null

Given('a valid payment token', function() {
  token = this.createCCToken()
})

Given('a customer', function() {
  customer = this.createCustomer()
})

When('the customer does not exist in Stripe', async function() {
  const { email } = customer
  const $customer = await findCustomerByEmail(email)
  if ($customer) await this.cleanStripeCustomer($customer.id)
})

Then('a new customer should be created in Stripe', async function() {
  const { email } = customer
  await addCustomerPaymentMethod(customer, token)

  const $customer = await findCustomerByEmail(email)
  expect($customer).to.be.a('object')
})

When('the customer exists in Stripe', async function() {
  const $customer = await this.createStripeCustomer()
  expect($customer).to.be.a('object')
})

Then('the customer should be updated in Stripe', async function() {
  const { email } = customer
  const value = 'New Name'

  customer.name = value
  await addCustomerPaymentMethod(customer, token)

  const $customer = await findCustomerByEmail(email)
  expect($customer).to.be.a('object')
  expect($customer.shipping).to.be.a('object')
  expect($customer.shipping.name).to.eql(value)
})

Then('a new customer should not be created in Stripe', async function() {
  const { email } = customer
  const customers = await this.findStripeCustomers(email)
  expect(customers.length).to.be.eql(1)
})
