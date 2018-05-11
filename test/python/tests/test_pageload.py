import pytest
from utils import get_load_time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures('driver','capsys')
class TestPageLoad(object):

    def test_page_load(self, driver, capsys):
        driver.get('https://saucecon.herokuapp.com')
        metrics = driver.get_log('sauce:metrics')
        page_load_time = metrics['domContentLoaded'] - metrics['navigationStart']
        assert page_load_time <= 5

        network_timings = driver.get_log('sauce:network')['requests']
        timings_per_url = [{'url': req['url'], 'load_time': get_load_time(req)} for req in network_timings]
        sorted_timings = sorted(timings_per_url, key=lambda item: item['load_time'], reverse=True)
        with capsys.disabled():
            for entry in sorted_timings:
                print '\n{}: URL: {}'.format(sorted_timings.index(entry), entry['url'])
                print 'load time: {}ms'.format(int(round(entry['load_time'])))