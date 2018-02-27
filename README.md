Extended Debugging Demo
=======================

This project is a simple demo on how to utilize the extended debugging functionality on Sauce Labs. It runs a test suite that fails 75% of of the time due to a failing backend response. To use the local server you need to run your tests locally with SauceConnectm.

# Requirements

To run the demo you need the following preinstalled on your system:

- [Node.js](https://nodejs.org/en/) (v6.11.3 or higher)

# Install

To install the demo you first need to download the project:

```sh
# via git
$ g clone git@github.com:saucelabs/extended_debugging_demo.git
```

Then jump into the folder and install the dependencies:

```sh
$ cd extended_debugging_demo
$ npm install
```

# Run Demo

To run the demo make sure you have `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` set in your environment variables. If not you can set these via:

```sh
$ export SAUCE_USERNAME=<your-sauce-username>
$ export SAUCE_ACCESS_KEY=<your-access-key>
```

There are several Demos prepared:

### Analytics Check

Some companies need to make sure that analytics request are made properly so they are paid correctly, e.g. for advertisement. This demo enters a Todo and and checks if a Google Analytics request was made successfuly.

#### Used Features:
- intercept command (let request fail)
- log command (sauce:network)

#### Execute via
```js
$ npm run demo:analytics
```

### Blocked Demo

The demo app tries to load a third party script that takes up to 5 seconds to load. This demo uses the intercept command to __block__ the script from being load in order to make sure the app loads faster.

#### Used Features:
- intercept command (block request)
- log command (sauce:network, sauce:metrics)

#### Execute via
```js
$ npm run demo:blocked
```

### Offline Demo

The demo app is offline ready, so it works when the user has no internet connection. This demo disables all network throughput and tries to reach the page.

#### Used Features:
- throttle command

#### Execute via
```js
$ npm run demo:offline
```

### Pageload Demo

This demo checks if the page loads under 5 seconds. Since the third party scripts slows down the page load this test will always fail. It logs all request and shows how long each one took to load.

#### Used Features:
- log command (sauce:network)

#### Execute via
```js
$ npm run demo:pageload
```

### Populate Demo

This demo shows how slow and brittle it can be to use the UI to bring the application into a certain state (e.g. have 10 Todos entered in DB).

#### Execute via
```js
$ npm run demo:populate
```

### Prepopulate Demo

This demo fixes the flaw of the Populate Demo by setting the state of the app using a custom command. It shows that the test executes way quicker than doing it the old way.

#### Used Features:
- intercept command (mock responses)

#### Execute via
```js
$ npm run demo:prepopulate
```
