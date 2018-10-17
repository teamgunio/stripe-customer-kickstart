import {} from 'dotenv/config';
import path from 'path';
import bunyan from 'bunyan';
import bunyanMiddleware from 'express-bunyan-logger';
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import Stripe from 'stripe';
import Plaid from 'plaid';

const {
  NODE_ENV,
  HTTP_PORT,
  PLAID_ENV,
  PLAID_CLIENT,
  PLAID_PKEY,
  PLAID_SKEY,
  STRIPE_SKEY,
  ROOT_REDIRECT,
} = process.env;

const PORT = HTTP_PORT || 3000;

const stripe = Stripe(STRIPE_SKEY);
const plaid = new Plaid.Client(
  PLAID_CLIENT,
  PLAID_PKEY,
  PLAID_SKEY,
  Plaid.environments[PLAID_ENV],
);

const log = bunyan.createLogger({ name: 'slack-customer-kickstart'})
const app = express();

if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackHotMiddleware(webpack(webpackConfig)))
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

const publicPath = express.static(path.join(__dirname, '../dist'));
const indexPath = path.join(__dirname, 'index.html');

app.use( bunyanMiddleware() );
app.use( cors() );
app.use( bodyparser.json() );
app.use( bodyparser.urlencoded( {
  extended: true
}));

app.use('/dist', publicPath);

app.get('/', function (_, res) {
  if (ROOT_REDIRECT) {
    res.location(ROOT_REDIRECT);
    res.sendStatus(301);
  } else {
    res.sendFile(indexPath)
  }
});

app.post('/api/cc', (req, res, next) => {
  const { name, company, email, phone, address, city, state, zip, token } = req.body;

  if ( !token || !token.id) {
    log.warn('No token in request');
    res.status(500);
    res.send('Missing token');
    return next();
  }

  stripe.customers.create({
    email,
    shipping: {
      name,
      phone,
      address: {
        line1: address,
        city,
        country: 'US',
        state,
        postal_code: zip,
      },
    },
    source: token.id,
  }, (err, customer) => {
    if (err) {
      log.error(err);
      res.status(500);
      res.send('Unable to create customer.');
      return next();
    }
    
    res.send('Ok');
  })

});

app.post('/api/ach', (req, res, next) => {
  const { name, company, email, phone, address, city, state, zip, plaid_token, plaid_metadata } = req.body;

  if ( !plaid_token) {
    log.warn('No token in request');
    res.status(500);
    res.send('Missing token');
    return next();
  }

  plaid.exchangePublicToken(plaid_token, (plaid_err, plaid_res) => {
    if (plaid_err) {
      log.error(err);
      res.status(500);
      res.send('Error negotiating with provider');
      return next();
    }

    plaid.createStripeToken(plaid_res.access_token, plaid_metadata.account.id, (token_err, token_res) => {
      if (token_err) {
        log.error(err);
        res.status(500);
        res.send('Error negotiating with provider');
        return next();
      }

      stripe.customers.create({
        email,
        shipping: {
          name,
          phone,
          address: {
            line1: address,
            city,
            country: 'US',
            state,
            postal_code: zip,
          },
        },
        source: token_res.stripe_bank_account_token,
      }, (err, customer) => {
        if (err) {
          log.error(err);
          res.status(500);
          res.send('Unable to create customer.');
          return next();
        }

        res.send('Ok');
      });

    });
  });
});


if (!module.parent) {
  const { npm_package_name, npm_package_version } = process.env;
  log.info(
    `${npm_package_name} @${npm_package_version} is running with:
      port: ${PORT}
      NODE_ENV: ${NODE_ENV}
      HTTP_PORT: ${HTTP_PORT}
      PLAID_ENV: ${PLAID_ENV}
      PLAID_CLIENT: ${PLAID_CLIENT}
      PLAID_PKEY: ${PLAID_PKEY}
      ROOT_REDIRECT: ${ROOT_REDIRECT}`
  );

  app.listen(PORT, () => {
    log.info(`listening on port ${PORT}`);
  });
}

