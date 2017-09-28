Extended Debugging Demo
=======================

This project is a simple demo on how to utilize the extended debugging functionality on Sauce Labs. It runs a test suite that fails 75% of of the time due to a JavaScript bug. The guinea pig is deployed to [AWS](http://extended-debugging-demo.s3-website-us-west-1.amazonaws.com) but can be also served via localhost to demo usage of Sauce Connect.

# Requirements

To run the demo you need the following preinstalled on your system:

- [Node.js](https://nodejs.org/en/) (v6.11.3 or higher)

# Install

To install the demo you first need to download the project:

```sh
# via git
$ g clone git@github.com:saucelabs/extended_debugging_demo.git
# or download as zip
$ curl https://github.com/saucelabs/extended_debugging_demo/archive/master.zip -o extended_debugging_demo.zip
$ unzip extended_debugging_demo.zip
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

If you want to include the usage of Sauce Connect in your demo run the following command which will spawn a static server that will be accessed via Sauce Connect tunnel:

```sh
$ npm run test:local
```