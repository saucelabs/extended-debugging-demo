import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException


@pytest.mark.usefixtures('driver')
class TestPopulate(object):
    def test_populate(self, driver):
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

        driver.get('https://saucecon.herokuapp.com')
        new_todo = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.ID, "new-todo"))
        )

        # clean up any leftover todos from previous runs
        try:
            while driver.find_elements_by_class_name("destroy"):
                button = driver.find_element_by_class_name("destroy")
                driver.execute_script("arguments[0].click();", button)
                WebDriverWait(driver, 1)
        except NoSuchElementException:
            pass

        #populate the todo list one by one
        for todo in todo_list:
            new_todo.send_keys(todo)
            new_todo.send_keys(Keys.RETURN)
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "(//label[@class][text()='%s'])" % todo)))

        assert len(driver.find_elements_by_xpath("(//label[@class])")) == len(todo_list)