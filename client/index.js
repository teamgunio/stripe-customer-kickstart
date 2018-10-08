import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';

const { BRAND } = process.env;

const App = () => {
  return (
    <div>
      <div className="globalContent">
        <main>
        <div className="stripes">
          <div className="stripe s1"></div>
          <div className="stripe s2"></div>
          <div className="stripe s3"></div>
        </div>
        <section className="container-lg">

          <div className="cell example sck">
            <h1>{BRAND} Customer Kickstarter</h1>
            <h2>Payment Setup</h2>
            <br/>
            <form>
              <fieldset>
                <legend className="card-only" data-tid="elements_examples.form.pay_with_card">Pay with card</legend>
                <legend className="payment-request-available" data-tid="elements_examples.form.enter_card_manually">Or enter card details</legend>
                <div className="row">
                  <div className="field">
                    <label htmlFor="sck-name" data-tid="elements_examples.form.name_label">Name</label>
                    <input id="sck-name" data-tid="elements_examples.form.name_placeholder" className="input" type="text" placeholder="Jane Doe" required="" autoComplete="name"/>
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="sck-email" data-tid="elements_examples.form.email_label">Email</label>
                    <input id="sck-email" data-tid="elements_examples.form.email_placeholder" className="input" type="text" placeholder="janedoe@gmail.com" required="" autoComplete="email"/>
                  </div>
                  <div className="field">
                    <label htmlFor="sck-phone" data-tid="elements_examples.form.phone_label">Phone</label>
                    <input id="sck-phone" data-tid="elements_examples.form.phone_placeholder" className="input" type="text" placeholder="(941) 555-0123" required="" autoComplete="tel"/>
                  </div>
                </div>
                <div data-locale-reversible>
                  <div className="row">
                    <div className="field">
                      <label htmlFor="sck-address" data-tid="elements_examples.form.address_label">Address</label>
                      <input id="sck-address" data-tid="elements_examples.form.address_placeholder" className="input" type="text" placeholder="185 Berry St" required="" autoComplete="address-line1"/>
                    </div>
                  </div>
                  <div className="row" data-locale-reversible>
                    <div className="field">
                      <label htmlFor="sck-city" data-tid="elements_examples.form.city_label">City</label>
                      <input id="sck-city" data-tid="elements_examples.form.city_placeholder" className="input" type="text" placeholder="San Francisco" required="" autoComplete="address-level2"/>
                    </div>
                    <div className="field">
                      <label htmlFor="sck-state" data-tid="elements_examples.form.state_label">State</label>
                      <input id="sck-state" data-tid="elements_examples.form.state_placeholder" className="input empty" type="text" placeholder="CA" required="" autoComplete="address-level1"/>
                    </div>
                    <div className="field">
                      <label htmlFor="sck-zip" data-tid="elements_examples.form.postal_code_label">ZIP</label>
                      <input id="sck-zip" data-tid="elements_examples.form.postal_code_placeholder" className="input empty" type="text" placeholder="94107" required="" autoComplete="postal-code"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="field">
                    <label htmlFor="sck-card" data-tid="elements_examples.form.card_label">Card</label>
                    <div id="sck-card" className="input"></div>
                  </div>
                </div>
                <button type="submit" data-tid="elements_examples.form.pay_button">Pay $25</button>
              </fieldset>
              <div className="error" role="alert">
                <span className="message"></span></div>
            </form>
            <div className="success">
              <div className="icon">
              </div>
              <h3 className="title" data-tid="elements_examples.success.title">Payment successful</h3>
              <p className="message"><span data-tid="elements_examples.success.message">Thanks htmlFor trying Stripe Elements. No money was charged, but we generated a token: </span><span className="token">tok_189gMN2eZvKYlo2CwTBv9KKh</span></p>
              <a className="reset" href="#">
              </a>
            </div>

          </div>

        </section>
        </main>
      </div>
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
