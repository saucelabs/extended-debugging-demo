import pytest
import sys
import os

from os import environ

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.remote.remote_connection import RemoteConnection

sys.path.append(os.path.join(os.path.dirname(__file__), 'helpers'))

browsers = [
    {
        "platform": "macOS 10.13",
        "browserName": "chrome",
        "version": "64.0"
    }]

def pytest_generate_tests(metafunc):
    if 'driver' in metafunc.fixturenames:
        metafunc.parametrize('browser_config',
                             browsers,
                             ids=_generate_param_ids('browserConfig', browsers),
                             scope='function')


def _generate_param_ids(name, values):
    return [("<{}:{}>".format(name, value)).replace('.', '_') for value in values]


@pytest.yield_fixture(scope='function')
def driver(request, browser_config):
    # if the assignment below does not make sense to you please read up on object assignments.
    # The point is to make a copy and not mess with the original test spec.
    desired_caps = dict()
    desired_caps.update(browser_config)
    test_name = request.node.name
    build_tag = environ.get('BUILD_TAG', None)
    tunnel_id = environ.get('TUNNEL_IDENTIFIER', None)
    username = environ.get('SAUCE_USERNAME', None)
    access_key = environ.get('SAUCE_ACCESS_KEY', None)

    selenium_endpoint = "https://{}:{}@ondemand.saucelabs.com:443/wd/hub".format(username, access_key)
    desired_caps['build'] = build_tag
    # we can move this to the config load or not, also messing with this on a test to test basis is possible :)
    desired_caps['tunnelIdentifier'] = tunnel_id
    desired_caps['name'] = test_name
    desired_caps['extendedDebugging'] = True

    executor = RemoteConnection(selenium_endpoint, resolve_ip=False)
    browser = webdriver.Remote(
        command_executor=executor,
        desired_capabilities=desired_caps
    )

    # This is specifically for SauceLabs plugin.
    # In case test fails after selenium session creation having this here will help track it down.
    # creates one file per test non ideal but xdist is awful
    if browser is not None:
        with open("{}.testlog".format(browser.session_id), 'w') as f:
            f.write("SauceOnDemandSessionID={} job-name={}\n".format(browser.session_id, test_name))
    else:
        raise WebDriverException("Never created!")

    yield browser
    # Teardown starts here
    
    # report results
    try:
        browser.execute_script("sauce:job-result={}".format(str(not request.node.rep_call.failed).lower()))
        browser.quit()
    except WebDriverException:
        # we can ignore the exceptions of WebDriverException type -> We're done with tests.
        print('Warning: The driver failed to quit properly. Check test and server side logs.')
    

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # this sets the result as a test attribute for SauceLabs reporting.
    # execute all other hooks to obtain the report object
    outcome = yield
    rep = outcome.get_result()

    # set an report attribute for each phase of a call, which can
    # be "setup", "call", "teardown"
    setattr(item, "rep_" + rep.when, rep)