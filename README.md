# Stripe Customer Kickstart

A Widget that collects &amp; verifies customer payment info and creates new customers in Stripe.  
Example: [https://www.gun.io/payment](https://www.gun.io/payment)

## Features

* Customer Information Collection
* Accepts Credit Card & ACH Payments
* Creates a Customer in Stripe
* Standalone or CMS embedded endpoint
* Redirection for embedded support

## Usage

This is a React Application & supporting API to capture customer payment information and create customers in Stripe. It is designed to be embedded in web pages managed by CMS's like HubSpot or Wordpress. It _can_ also be styled and used as a standalone application.

You should fork this repository to host your own version of this tool that is connected to your Stripe & Plaid accounts.

## Embedding

You'll need to add the following tags to your page.

```html
<div id="stripe-customer-kickstart"></div>

<script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
<script id="plaid-js" src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" async></script>
<script src="https://[HOST]/dist/bundle.js"></script>
```

The React Application will latch onto the `<div>` and render the customer & payment information form.

## Deploying

The deployment pipeline is CircleCi and the application will deploy to an AWS Elastic Beanstalk instance. For the CircleCi deployments to work you'll want to tweak the `image` in `.deploy/Dockerrun.aws.json` and you'll want to have created your AWS EB Instance already, configured for Multi-container. Otherwise, you'll get some issues with CircleCi hanging, asking you answer questions.

### CircleCi Configuration

You'll need the following environment variables setup in CircleCi:

```circleci
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
BRAND
DOCKER_EMAIL
DOCKER_PASS
DOCKER_USER
HOST
HOST_PORT
PLAID_CLIENT
PLAID_ENV
PLAID_PKEY
PLAID_SKEY
ROOT_REDIRECT
STRIPE_PKEY
STRIPE_SKEY
```

#### Builds

CircleCi builds essentially run `NODE_ENV=production npm run build` to produce static & babel-compiled artifacts, and distrubtes them in a Docker container. ENV variables in CircleCi are compiled into static client & server artifacts.

#### Deployment

Env vars from CircleCi are injected into the AWS EB deployment template using `sed` and an `eb deploy` is run against the output.

## Contributing

## Stack

* NodeJS: `lts/carbon`
* Docker

## Quick Start

```bash
yarn install
yarn start
```

The `express` server will fire up and compile the static front end assets with `webpack`, automatically watching for changes.  
Browse to [`http://localhost:3000`](http://localhost:3000).

## Testing

This project follows BDD testing with Cucumber. You can run a standalone test or in watch mode. Test runners support recording remote API calls into local fixtures for improving test performance. New records can be captured with `VCR_MODE=record` Running tests in `NODE_ENV=CI` will suppress some output and will dodge around recorded fixtures for remote API calls.

```bash
yarn test
yarn run test:watch
VCR_MODE=record yarn test
```

## Environment

This project uses `dotenv` to provide environment configuration. Save a copy of `.env.distrib` to `.env` and configure accordingly.

```bash
HOST=localhost
HOST_PORT=3000
STRIPE_PKEY=
STRIPE_SKEY=
PLAID_ENV=[sandbox|development|production]
PLAID_CLIENT=
PLAID_PKEY=
PLAID_SKEY=

# Injects a company name in the headers
BRAND=

# Optional, causes reqeusts to / to redirect - useful for
# situations where you want traffic to go to the page the
# widget is embedded on.
ROOT_REDIRECT=
```

### Deployed Environment Variables

Environment variables are managed via AWS console for your EBS deployment

### CI Environment Variables

In addition to the application environment variables you'll want to add to CircleCi your AWS & Docker credentials. You'll need:

```bash
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DOCKER_EMAIL
DOCKER_PASS
DOCKER_USER
```
