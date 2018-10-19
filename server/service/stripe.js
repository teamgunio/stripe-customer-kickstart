import {} from 'dotenv/config';
import bunyan from 'bunyan';
import Stripe from 'stripe';

const { STRIPE_SKEY } = process.env;

const log = bunyan.createLogger({ name: 'sck:stripe'});
const stripe = Stripe(STRIPE_SKEY);

const findCustomerByEmail = async (email) => {
  try {
    const list = await stripe.customers.list({ email });
    const [customer] = list.data;
    return customer;
  } catch (e) {
    log.error(e, 'Unable to find customer');
    return null
  }
}

export const addCustomerPaymentMethod = async (customerInfo, token) => {
  const { name, company, email, phone, address, city, state, zip } = customerInfo;

  log.info(`Adding Payment Method to Customer: ${email}`);

  const customer = await findCustomerByEmail(email);
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

  if (customer) {
    log.info(`Updating Customer: ${email}`);
    try {
      await stripe.customers.update(customer.id, {
        shipping,
        source: token,
      });
      return true;
    } catch(e) {
      log.error(e, 'Unable to update customer');
      return false;
    }
  } else {
    log.info(`Creating Customer: ${email}`);
    try {
      await stripe.customers.create({
        email,
        shipping,
        source: token,
      });
      return true;
    } catch(e) {
      log.error(e, 'Unable to create customer')
      return false;
    }
  }
}
