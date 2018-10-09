import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

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
      created: false,
      submitted: false,
    };
  }

  createCustomer () {
    const post = new FormData()
    const { name, company, email, phone, address, city, state, zip, token } = this.state;

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, email, phone, address, city, state, zip, token }),
    };

    return fetch('/api/token', config);
  }

  handleSubmit(e) {
    const { stripe } = this.props;
    const { name, email } = this.state;

    e.preventDefault();

    this.setState({
      submitted: true,
    });

    stripe.createToken({ name, email })
    .then(({token}) => {
      this.setState({
        token
      });
    })
    .then(this.createCustomer.bind(this))
    .then((res) => {
      if (res.ok) {
        this.setState({
          created: true,
        });
      } else {
        this.setState({
          submitted: false,
        });
      }
    })
    .catch((err) => {
      this.setState({
        submitted: false,
      })
    });
  }

  handleChange(e) {
    const { id, value } = e.target;
    let state = {};
    state[id] = value;
    this.setState(state);
  }

  render() {
    const { name, company, email, phone, address, city, state, zip, token, created, submitted } = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend className="card-only">Customer Info</legend>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" className="input" type="text" placeholder="Jane Doe" required autoComplete="name" value={name} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" className="input" type="text" placeholder="ACME" required autoComplete="company" value={company} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" type="email" placeholder="janedoe@acme.com" required autoComplete="email" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" className="input" type="tel" placeholder="(941) 555-0123" required autoComplete="tel" onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div data-locale-reversible>
            <div className="row">
              <div className="field">
                <label htmlFor="address">Address</label>
                <input id="address" className="input" type="text" placeholder="185 Berry St" required autoComplete="address-line1" onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="row" data-locale-reversible>
              <div className="field">
                <label htmlFor="city">City</label>
                <input id="city" className="input" type="text" placeholder="San Francisco" required autoComplete="address-level2" onChange={this.handleChange.bind(this)} />
              </div>
              <div className="field">
                <label htmlFor="state">State</label>
                <input id="state" className="input empty" type="text" placeholder="CA" required autoComplete="address-level1" onChange={this.handleChange.bind(this)} />
              </div>
              <div className="field">
                <label htmlFor="zip">ZIP</label>
                <input id="zip" className="input empty" type="text" placeholder="94107" required autoComplete="postal-code" onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="card-only">Payment Info</legend>
          <div className="row">
            <div className="field">
              <label htmlFor="card">Card</label>
              <CardElement />
            </div>
          </div>
        </fieldset>
        <button type="submit" className={created ? 'success' : ''} disabled={submitted ? true : false}>
          { token ? 
            `Thank You, Setup Complete!`
            : `Setup Billing Profile`
          }
        </button>
      </form>
    )
  }
}

export default injectStripe(PaymentInfo)
