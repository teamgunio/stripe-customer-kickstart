import {} from 'dotenv/config';
import path from 'path';
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import Stripe from 'stripe'

const { STRIPE_SKEY } = process.env;
const PORT = process.env.HTTP_PORT || 3000;

const stripe = Stripe(STRIPE_SKEY);
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackHotMiddleware(webpack(webpackConfig)))
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

const publicPath = express.static(path.join(__dirname, '../dist'));
const indexPath = path.join(__dirname, 'index.html');

app.use(cors());
app.use( bodyparser.json() );
app.use( bodyparser.urlencoded( {
  extended: true
}));

app.use('/dist', publicPath);
app.get('/', function (_, res) { res.sendFile(indexPath) });

app.post('/api/token', (req, res, next) => {
  const { name, company, email, phone, address, city, state, zip, token } = req.body;

  if ( !token || !token.id) {
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
      console.error(err);
      res.status(500);
      res.send('Unable to create customer.');
      return next();
    }

    res.send('Ok');
  })

});

if (!module.parent) {
  const { npm_package_name, npm_package_version } = process.env;
  console.log(
    `${npm_package_name} @${npm_package_version} is running with:
      port: ${PORT}`
  );

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

