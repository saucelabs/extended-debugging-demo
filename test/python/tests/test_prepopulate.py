import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.usefixtures('driver')
class TestPrePopulate(object):
    def test_prepopulate(self, driver):
        todo_list=[
        'Prepare proposal for SauceCon 2018',
        'Get feedback from colleagues',
        'Submit CFP',
        'Wait for response from organizer',
        'Create the outline of the talk',
        'Build slides',
        'Rehearse talk',
        'Go to SauceCon at Parc 55',
        'Present talk at Saucecon',
        'Evaluate Feedback'
        ]

        todo_json = [{'id': i, 'title': title, 'completed': False} for i,title in enumerate(todo_list)]

        driver.execute_script('sauce:intercept', {
            'url': 'https://saucecon.herokuapp.com/api/todos',
            'response': {'body': todo_json}
        })

        driver.get('https://saucecon.herokuapp.com')
        assert len(driver.find_elements_by_xpath("(//label[@class])")) == len(todo_list)