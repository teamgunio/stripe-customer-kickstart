# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.6.0"></a>
# [1.6.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.6...v1.6.0) (2019-04-15)


### Bug Fixes

* General linting cleanup ([63e3d52](https://github.com/teamgunio/stripe-customer-kickstart/commit/63e3d52))
* General linting cleanup, last pass ([5c82b2a](https://github.com/teamgunio/stripe-customer-kickstart/commit/5c82b2a))
* Repair link to http://localhost:3000 reference ([f5e072a](https://github.com/teamgunio/stripe-customer-kickstart/commit/f5e072a))
* Repair link to https://www.gun.io/payment ([fa357a5](https://github.com/teamgunio/stripe-customer-kickstart/commit/fa357a5))
* switching back to npm since yarn seems to consistently fail in circle ([1e3f37d](https://github.com/teamgunio/stripe-customer-kickstart/commit/1e3f37d))
* Trying to work around CircleCi and issues with yarn install ([0faa6e6](https://github.com/teamgunio/stripe-customer-kickstart/commit/0faa6e6))
* Trying to work around CircleCi and issues with yarn install ([921ddcf](https://github.com/teamgunio/stripe-customer-kickstart/commit/921ddcf))
* **npm:** going back to NPM entirely since yarn is so flakey ([5ba56ef](https://github.com/teamgunio/stripe-customer-kickstart/commit/5ba56ef))
* **submit:** fixes an issue with pre-mature form submission; buttons that don't explicity have a "button" type try to submit the form early ([b28e828](https://github.com/teamgunio/stripe-customer-kickstart/commit/b28e828))


### Features

* **paymentMethod:** moves payment method selection to URL parameters instead of user select via form ([3daa369](https://github.com/teamgunio/stripe-customer-kickstart/commit/3daa369))



<a name="1.5.6"></a>
## [1.5.6](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.5...v1.5.6) (2018-10-24)


### Bug Fixes

* give containers more memory for webpack builds ([80d4b56](https://github.com/teamgunio/stripe-customer-kickstart/commit/80d4b56))



<a name="1.5.5"></a>
## [1.5.5](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.4...v1.5.5) (2018-10-24)


### Bug Fixes

* brings back missing [@babel](https://github.com/babel)/node dependency ([89f4b0f](https://github.com/teamgunio/stripe-customer-kickstart/commit/89f4b0f))
* defers to building at serve time; this allows compiling env vars into runtime; cleanup unused plugins from webpack; don't build in ci anymore; ignore ebs artifacts ([1622981](https://github.com/teamgunio/stripe-customer-kickstart/commit/1622981))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.3...v1.5.4) (2018-10-20)



<a name="1.5.3"></a>
## [1.5.3](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.2...v1.5.3) (2018-10-20)



<a name="1.5.2"></a>
## [1.5.2](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.1...v1.5.2) (2018-10-20)


### Bug Fixes

* moves missing dependency for runtime ([51a3367](https://github.com/teamgunio/stripe-customer-kickstart/commit/51a3367))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.5.0...v1.5.1) (2018-10-20)


### Bug Fixes

* fixes production webpack config to not require transpiling ([b78bf6a](https://github.com/teamgunio/stripe-customer-kickstart/commit/b78bf6a))
* improves logging in Stripe service\nchore: introduces cucumber tests ([770d088](https://github.com/teamgunio/stripe-customer-kickstart/commit/770d088))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.10...v1.5.0) (2018-10-19)


### Features

* introduces customer updates instead of creating a new customer each time\nchore: moves stripe/plaid logic into services for better composition/testability ([d98ee51](https://github.com/teamgunio/stripe-customer-kickstart/commit/d98ee51))



<a name="1.4.10"></a>
## [1.4.10](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.9...v1.4.10) (2018-10-17)



<a name="1.4.9"></a>
## [1.4.9](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.8...v1.4.9) (2018-10-17)



<a name="1.4.8"></a>
## [1.4.8](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.7...v1.4.8) (2018-10-17)


### Bug Fixes

* better startup log ([56f2d44](https://github.com/teamgunio/stripe-customer-kickstart/commit/56f2d44))



<a name="1.4.7"></a>
## [1.4.7](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.6...v1.4.7) (2018-10-17)


### Bug Fixes

* adds application, error & request logging ([b083228](https://github.com/teamgunio/stripe-customer-kickstart/commit/b083228))



<a name="1.4.6"></a>
## [1.4.6](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.5...v1.4.6) (2018-10-12)


### Bug Fixes

* fixes an issue where the frontend didn't use PLAID_ENV ([69b1664](https://github.com/teamgunio/stripe-customer-kickstart/commit/69b1664))



<a name="1.4.5"></a>
## [1.4.5](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.4...v1.4.5) (2018-10-12)



<a name="1.4.4"></a>
## [1.4.4](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.3...v1.4.4) (2018-10-12)



<a name="1.4.3"></a>
## [1.4.3](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.2...v1.4.3) (2018-10-12)


### Bug Fixes

* moves font styling to index to avoid collisions when embedding ([d0d3339](https://github.com/teamgunio/stripe-customer-kickstart/commit/d0d3339))



<a name="1.4.2"></a>
## [1.4.2](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.1...v1.4.2) (2018-10-11)



<a name="1.4.1"></a>
## [1.4.1](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.4.0...v1.4.1) (2018-10-11)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.3.1...v1.4.0) (2018-10-11)


### Bug Fixes

* fixes success message to be a little bit more clear and transition away from the form ([f516a77](https://github.com/teamgunio/stripe-customer-kickstart/commit/f516a77))


### Features

* adds optional redirect on root requests to support keeping traffic going to an embedded location like a wordpress/hubspot ([749da61](https://github.com/teamgunio/stripe-customer-kickstart/commit/749da61))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.3.0...v1.3.1) (2018-10-11)


### Bug Fixes

* resolves a UX issue where payment method selection was not intuitive ([98bc6d6](https://github.com/teamgunio/stripe-customer-kickstart/commit/98bc6d6))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.2.4...v1.3.0) (2018-10-11)


### Features

* introduces ACH support with Plaid ([1b60c5e](https://github.com/teamgunio/stripe-customer-kickstart/commit/1b60c5e))



<a name="1.2.4"></a>
## [1.2.4](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.2.3...v1.2.4) (2018-10-10)



<a name="1.2.3"></a>
## [1.2.3](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.2.2...v1.2.3) (2018-10-09)


### Bug Fixes

* adds cors & updates field suggestions ([09754cb](https://github.com/teamgunio/stripe-customer-kickstart/commit/09754cb))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.2.1...v1.2.2) (2018-10-09)


### Bug Fixes

* adds env driven host to ensure that client/api calls go to the right host ([6dcc607](https://github.com/teamgunio/stripe-customer-kickstart/commit/6dcc607))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.2.0...v1.2.1) (2018-10-09)


### Bug Fixes

* fixes an issue that prevent webpack from compiling ci env vars ([de8709f](https://github.com/teamgunio/stripe-customer-kickstart/commit/de8709f))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.1.1...v1.2.0) (2018-10-09)


### Features

* enables customer creation in our server-side ([a97e46e](https://github.com/teamgunio/stripe-customer-kickstart/commit/a97e46e))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.1.0...v1.1.1) (2018-10-09)


### Bug Fixes

* fixes an issue where the proper env vars weren't being built into the deployment ([0ceb4c3](https://github.com/teamgunio/stripe-customer-kickstart/commit/0ceb4c3))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/teamgunio/stripe-customer-kickstart/compare/v1.0.0...v1.1.0) (2018-10-09)


### Features

* implements payment collection form and API calls ([71e8ea8](https://github.com/teamgunio/stripe-customer-kickstart/commit/71e8ea8))



<a name="1.0.0"></a>
# 1.0.0 (2018-10-08)
