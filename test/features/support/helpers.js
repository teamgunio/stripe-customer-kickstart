import {} from 'dotenv/config'
import Stripe from 'stripe'

const { STRIPE_SKEY} = process.env
const stripe = Stripe(STRIPE_SKEY)

export const createCCToken = async () => {
  return 'tok_visa'
}

export const createACHToken = () => {

}

export const createStripeCustomer = async () => {
  const customer = createCustomer()
  const token = await createCCToken()

  const {
    name,
    company,
    email,
    phone,
    address,
    city,
    state,
    zip
  } = customer

  const shipping = {
    name,
    phone,
    address: {
      line1: address,
      city,
      country: 'US',
      state,
      postal_code: zip,
    },
  };

  const $customer = await stripe.customers.create({
    email,
    shipping,
    source: token,
  })

  return $customer
}

export const cleanStripeCustomer = async (customer) => {
  if (customer.id) return stripe.customers.del(id)

  const { email } = customer
  const customers = await findStripeCustomers(email)
  if (customers && customers.length) customers.map(async ({id}) => {
    await stripe.customers.del(id)
  })
}

export const findStripeCustomers = async (email) => {
  const list = await stripe.customers.list({ email })
  return list.data
}

export const createCustomer = () => {
  return {
    name: 'John Doe',
    company: 'Gun.io',
    email: 'sck-test@gun.io',
    phone: '9494134352',
    address: '29355 Modjeska Canyon Rd',
    city: 'Silverado',
    state: 'CA',
    zip: '92676',
  }
}
