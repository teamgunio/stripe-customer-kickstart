import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

const { HOST } = process.env;
const { HOST_PORT } = process.env;
const { NODE_ENV } = process.env;
const { PLAID_PKEY } = process.env;

const BASE_URL = `//${HOST}${(NODE_ENV === 'development') ? `:${HOST_PORT}` : ''}`;

class PaymentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      token: '',
      method: 'cc',
      errors: [],
      created: false,
      submitted: false,
      plaid: null,
      plaid_token: null,
      plaid_metadata: null,
    };
  }

  componentDidMount() {
    if (window.Plaid) {
      this.setState({plaid: this.initPlaid()});
    } else {
      document.querySelector('#plaid-js').addEventListener('load', () => {
        this.setState({plaid: this.initPlaid()});
      });
    }
  }

  initPlaid() {
    return window.Plaid.create({
      env: 'sandbox',
      clientName: 'Gun.io',
      key: PLAID_PKEY,
      product: ['auth'],
      selectAccount: true,
      onSuccess: (public_token, metadata) => {
        this.setState({
          plaid_token: public_token,
          plaid_metadata: metadata,
        });
      },
      onExit: (err, metadata) => {
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }

        window.document.getElementById('method').value = 'cc';
        this.setState({
          method: 'cc',
        });
      },
    });
  }

  createCustomerFromCard() {
    const post = new FormData()
    const { name, company, email, phone, address, city, state, zip, token, method } = this.state;

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, email, phone, address, city, state, zip, token, method }),
    };

    return fetch(`${BASE_URL}/api/cc`, config);
  }

  createCustomerFromACH() {
    const post = new FormData()
    const { name, company, email, phone, address, city, state, zip, plaid_token, plaid_metadata, method } = this.state;

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, email, phone, address, city, state, zip, plaid_token, plaid_metadata, method }),
    };

    return fetch(`${BASE_URL}/api/ach`, config);
  }

  handleSubmit(e) {
    const { stripe } = this.props;
    const { name, email, method, plaid_token } = this.state;

    e.preventDefault();

    this.setState({
      submitted: true,
      created: false,
      errors: [],
    });

    if (method === 'cc') {
      stripe.createToken({ name, email })
      .then(({token}) => {
        this.setState({
          token
        });
      })
      .then(this.createCustomerFromCard.bind(this))
      .then((res) => {
        if (res.ok) {
          this.setState({
            created: true,
          });
        } else {
          this.setState({
            submitted: false,
            errors: ['Unable to create customer'],
          });
          setTimeout(() => {
            this.setState({
              errors: [],
            });
          }, 3500);
        }
      })
      .catch((err) => {
        this.setState({
          submitted: false,
          errors: [err],
        })
      });
    } else if (method === 'ach' && plaid_token) {
      this.createCustomerFromACH()
      .then((res) => {
        if (res.ok) {
          this.setState({
            created: true,
          });
        } else {
          this.setState({
            submitted: false,
            errors: ['Unable to create customer'],
          });
          setTimeout(() => {
            this.setState({
              errors: [],
            });
          }, 3500);
        }
      })
      .catch((err) => {
        this.setState({
          submitted: false,
          errors: [err],
        })
      });
    }
  }

  handleChange(e) {
    const { id, value } = e.target;
    let state = {};
    state[id] = value;
    this.setState(state);

    if (id === 'method' && value === 'ach') {
      this.state.plaid.open()
    }
  }

  render() {
    const { name, company, email, phone, address, city, state, zip, token, method, created, submitted, errors, plaid_metadata } = this.state;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="card-only">Customer Info</legend>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" className="input" type="text" placeholder="Elon Musk" required autoComplete="name" value={name} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" className="input" type="text" placeholder="SpaceX" required autoComplete="company" value={company} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" type="email" placeholder="elon@spacex.com" required autoComplete="email" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" className="input" type="tel" placeholder="(310) 363-6000" required autoComplete="tel" onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div data-locale-reversible>
            <div className="row">
              <div className="field">
                <label htmlFor="address">Address</label>
                <input id="address" className="input" type="text" placeholder="Rocket Road" required autoComplete="address-line1" onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="row" data-locale-reversible>
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" className="input" type="text" placeholder="Hawthorne, California" required autoComplete="address-level2" onChange={this.handleChange.bind(this)} />
              </div>
              <div className="field">
                <label htmlFor="state">State</label>
                <input id="state" className="input empty" type="text" placeholder="CA" required autoComplete="address-level1" onChange={this.handleChange.bind(this)} />
              </div>
              <div className="field">
                <label htmlFor="zip">ZIP</label>
                <input id="zip" className="input empty" type="text" placeholder="90250" required autoComplete="postal-code" onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="card-only">Payment Info</legend>
          <div className="row">
            <div className="field">
              <label htmlFor="method">Payment Method</label>
              <select id="method" className="input empty" defaultValue={method} onChange={this.handleChange.bind(this)}>
                <option value="cc">Credit Card</option>
                <option value="ach">ACH</option>
              </select>
            </div>
          </div>
          { method === 'cc' ?
            <div className="row">
              <div className="field">
                <label htmlFor="card">Card</label>
                <CardElement />
              </div>
            </div> : null
          }
          { plaid_metadata ?
            <div className="row">
              <div className="field"><label>Institution:</label> { plaid_metadata.institution.name }</div>
              <div className="field"><label>Account:</label> { `XXXX-XXXX-${plaid_metadata.account.mask}` }</div>
            </div>
            : null
          }
        </fieldset>
        <button type="submit" className={(created ? 'success' : (errors.length) ? 'error' : '')} disabled={(submitted ? true : (errors.length ? true : false))}>
          { (!created && !submitted && !errors.length) ?
            `Setup Billing Profile` : null
          }
          { (created && !errors.length) ? 
            `Thank You, Setup Complete!` : null
          }
          {
            (!created && submitted && !errors.length) ?
            `Setting Up Your Profile...`
            : null
          }
          { (!created && !submitted && errors.length) ?
            `Error Setting Up Your Profile`
            : null
          }
        </button>
      </form>
    )
  }
}

export default injectStripe(PaymentInfo)
