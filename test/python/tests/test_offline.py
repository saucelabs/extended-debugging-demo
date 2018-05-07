import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures('driver')
class TestOffline(object):

    def test_offline(self, driver):
        driver.get('https://saucecon.herokuapp.com')
        WebDriverWait(driver, 2)
        assert driver.title == u'AngularJS \u2022 TodoMVC'

        driver.execute_script('sauce:throttle', {
            'condition': 'offline',
        })

        driver.get('https://saucecon.herokuapp.com')

        info = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "info"))
        )

        assert 'Offline Version' in info.text
        new_todo = driver.find_element_by_id('new-todo')
        assert not new_todo.is_enabled()
