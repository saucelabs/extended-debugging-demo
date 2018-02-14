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

Then run the demo:

```sh
$ npm run test
```
