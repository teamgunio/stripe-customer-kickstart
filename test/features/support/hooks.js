import fs from 'fs'
import nock from 'nock'
import { Before, After, AfterAll } from 'cucumber'

import {
  createCCToken,
  createACHToken,
  createCustomer,
  createStripeCustomer,
  cleanStripeCustomer,
  findStripeCustomers,
} from './helpers'

const { NODE_ENV, VCR_MODE } = process.env

const MOCK_PATH = 'test/features/support/fixtures.json'

const recordMocks = () => {
  nock.recorder.rec({
    dont_print: true,
    output_objects: true,
    use_separator: false,
    // enable_reqheaders_recording: true,
  })
}

const loadMocks = () => {
  const nocks = nock.load(MOCK_PATH)
  process.on('unhandledRejection', error => {
    const msg = error.detail.toString()
    if (msg.indexOf('Nock') === -1) {
      console.error('unhandledRejection', error.detail.toString());
    }
  })
}

const saveMocks = () => {
  const mocks = nock.recorder.play()
  fs.writeFileSync(MOCK_PATH, JSON.stringify(mocks))
}

if (VCR_MODE === 'record') {
  recordMocks()
} else if (NODE_ENV !== 'CI') {
  loadMocks()
}

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

AfterAll(() => {
  if (VCR_MODE === 'record') {
    saveMocks()
  }
})
