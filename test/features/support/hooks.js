import { Before, After } from 'cucumber'

import {
  createCCToken,
  createACHToken,
  createCustomer,
  createStripeCustomer,
  cleanStripeCustomer,
  findStripeCustomers,
} from './helpers'

Before(function() {
  this.createCCToken = createCCToken
  this.createACHToken = createACHToken
  this.createCustomer = createCustomer
  this.createStripeCustomer = createStripeCustomer
  this.cleanStripeCustomer = cleanStripeCustomer
  this.findStripeCustomers = findStripeCustomers
})
After(async function() {
  await this.cleanStripeCustomer(this.createCustomer())
})
