import React from 'react';
import ReactDOM from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';

import PaymentInfo from './PaymentInfo';

const { BRAND } = process.env;
const { STRIPE_PKEY } = process.env;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stripe: null,
    };
  }

  initStripe() {
    return window.Stripe(STRIPE_PKEY);
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: this.initStripe()});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripe: this.initStripe()});
      });
    }
  }
  
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <div>
          <div className="StripeCustomerKickstart">
            <main>
              <h1>{BRAND} Customer Kickstart</h1>
              <h2>Payment Setup</h2>
              <section>
                <Elements>
                  <PaymentInfo />
                </Elements>
              </section>
            </main>
          </div>
        </div>
      </StripeProvider>
    )
  }
}

export default App
