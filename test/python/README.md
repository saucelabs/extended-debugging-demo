Extended Debugging Demo - Python
=======================

Here are some additional sample code for running the Extended Debugging Demo tests in Python.  For general server setup read the main repo README.md

## Environment Setup

1. Global Dependencies
    * [Install Python](https://www.python.org/downloads/)
    * Or Install Python with [Homebrew](http://brew.sh/)
    ```
    $ brew install python
    ```
    * Install [pip](https://pip.pypa.io/en/stable/installing/) for package installation

2. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```
    $ export SAUCE_USERNAME=<your Sauce Labs username>
	$ export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```
3. Project
	* The recommended way to run your tests would be in [virtualenv](https://virtualenv.readthedocs.org/en/latest/). It will isolate the build from other setups you may have running and ensure that the tests run with the specified versions of the modules specified in the requirements.txt file.
	```$ pip install virtualenv```
	* Create a virtual environment in your project folder the environment name is arbitrary.
	```$ virtualenv venv```
	* Activate the environment:
	```$ source venv/bin/activate```
	* Install the required packages:
	```$ pip install -r requirements.txt```

## Running Tests:

* -n option designates number of parallel tests and -s to disable output capture.

*  Tests in Parallel:
    It is not recommended to run this particular set of tests in parallel as they hit the same server and can cause the tests to conflict

* Dump session ids for the SauceLabs CI plugins:
    ```$ cat $(find . -name "*.testlog")```


## Run Demo

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
```sh
$ py.test tests/test_analytics.py
```

### Blocked Demo

The demo app tries to load a third party script that takes up to 5 seconds to load. This demo uses the intercept command to __block__ the script from being load in order to make sure the app loads faster.

#### Used Features:
- intercept command (block request)
- log command (sauce:network, sauce:performance)

#### Execute via
```sh
$ py.test tests/test_blocked.py
```

### Offline Demo

The demo app is offline ready, so it works when the user has no internet connection. This demo disables all network throughput and tries to reach the page.

#### Used Features:
- throttle command

#### Execute via
```sh
$ py.test tests/test_offline.py
```

### Pageload Demo

This demo checks if the page loads under 5 seconds. Since the third party scripts slows down the page load this test will always fail. It logs all request and shows how long each one took to load.

#### Used Features:
- log command (sauce:network)

#### Execute via
```sh
$ py.test tests/test_pageload.py
```

### Populate Demo

This demo shows how slow and brittle it can be to use the UI to bring the application into a certain state (e.g. have 10 Todos entered in DB).

#### Execute via
```sh
$ py.test tests/test_populate.py
```

### Prepopulate Demo

This demo fixes the flaw of the Populate Demo by setting the state of the app using a custom command. It shows that the test executes way quicker than doing it the old way.

#### Used Features:
- intercept command (mock responses)

#### Execute via
```sh
$ py.test tests/test_prepopulate.py
```

[Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

## Advice/Troubleshooting

There may be additional latency when using a remote webdriver to run tests on Sauce Labs. Timeouts or Waits may need to be increased.
    * [Selenium tips regarding explicit waits](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Explicit+Waits)

### Resources
##### [Sauce Labs Documentation](https://wiki.saucelabs.com/)

##### [Selenium Documentation](http://www.seleniumhq.org/docs/)

##### [Python Documentation](https://docs.python.org/2.7/)

##### [Pytest Documentation](http://pytest.org/latest/contents.html)

##### [Stack Overflow](http://stackoverflow.com/)
* A great resource to search for issues not explicitly covered by documentation.

## Known Issues:
* Test output will be captured in .testlog files as the pytest-xdist plugin has issues with not capturing stdout and stderr. You can use the following commands to output session id's for CI integration and clean up.
```
$ cat *.testlog
$ rm -rf *.testlog
```
