import {} from 'dotenv/config';
import path from 'path';
import bunyan from 'bunyan';
import bunyanMiddleware from 'express-bunyan-logger';
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

import { addCustomerPaymentMethod } from './service/stripe';
import { getStripeACHToken } from './service/plaid';

const {
  NODE_ENV,
  HTTP_PORT,
  ROOT_REDIRECT,
} = process.env;

const PORT = HTTP_PORT || 3000;

const log = bunyan.createLogger({ name: 'sck:server'})
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

app.post('/api/cc', async (req, res, next) => {
  const { token } = req.body;

  if ( !token || !token.id) {
    log.warn('No token in request');
    res.status(500);
    res.send('Missing token');
    return next();
  }

  const added = await addCustomerPaymentMethod(req.body, token.id);
  if (!added) {
    res.status(500);
    res.send('Unable to create customer.');
    return next();
  }

  res.send('Ok');
  return next();
});

app.post('/api/ach', async (req, res, next) => {
  const { plaid_token, plaid_metadata } = req.body;

  if (!plaid_token) {
    log.warn('No token in request');
    res.status(500);
    res.send('Missing token');
    return next();
  }

  const token = await getStripeACHToken(plaid_token, plaid_metadata);
  if (!token) {
    log.warn('Unable to exchange Plaid token for Stripe token');
    res.status(500);
    res.send('Unable to create customer.');
    return next();
  }

  const added = await addCustomerPaymentMethod(req.body, token);
  if (!added) {
    res.status(500);
    res.send('Unable to create customer.');
    return next();
  }

  res.send('Ok');
  return next();
});

if (!module.parent) {
  const { npm_package_name, npm_package_version } = process.env;
  const { PLAID_ENV, PLAID_CLIENT, PLAID_PKEY } = process.env;

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

