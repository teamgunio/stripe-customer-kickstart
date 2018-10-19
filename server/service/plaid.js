import {} from 'dotenv/config';
import Plaid from 'plaid';

const {
  PLAID_ENV,
  PLAID_CLIENT,
  PLAID_PKEY,
  PLAID_SKEY,
} = process.env;

const plaid = new Plaid.Client(
  PLAID_CLIENT,
  PLAID_PKEY,
  PLAID_SKEY,
  Plaid.environments[PLAID_ENV],
);

export const getStripeACHToken = async (plaidToken, plaidMetadata) => {
  try {
    const { access_token } = await plaid.exchangePublicToken(plaidToken);
    const { stripe_bank_account_token } = await plaid.createStripeToken(access_token, plaidMetadata.account.id);
    return stripe_bank_account_token;
  } catch(e) {
    log.error(e);
    return null;
  }
}
