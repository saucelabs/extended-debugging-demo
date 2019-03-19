import pytest
from utils import get_load_time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures('driver','capsys')
class TestPageLoad(object):

    def test_page_load(self, driver, capsys):

        driver.get('https://saucecon.herokuapp.com')
        driver.execute_script('sauce:intercept', {
            "url": "https://saucecon.herokuapp.com/thirdPartyScript.js",
            "error": "Failed"
        })

        #it should load fast
        driver.get('https://saucecon.herokuapp.com')
        metrics = driver.get_log('sauce:metrics')
        page_load_time = metrics['domContentLoaded'] - metrics['navigationStart']
        assert page_load_time <= 5, 'Expected page load time to be lower than 5s but was {}s'.format(page_load_time)

        #it should also feel fast for the user based on the speed index
        performance = driver.get_log('sauce:performance')
        assert performance['speedIndex']<1500, 'Expected speed index to be lower than 1500 but was {}'.format(performance['speedIndex'])

        network_timings = driver.get_log('sauce:network')
        timings_per_url = [{'url': req['url'], 'load_time': get_load_time(req)} for req in network_timings]
        sorted_timings = sorted(timings_per_url, key=lambda item: item['load_time'], reverse=True)
        with capsys.disabled():
            for entry in sorted_timings:
                print '\n{}: URL: {}'.format(sorted_timings.index(entry), entry['url'])
                print 'load time: {}ms'.format(int(round(entry['load_time'])))
