import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

@pytest.mark.usefixtures('driver')
class TestAnalytics(object):

    def test_analytics(self, driver):
        RANDOM_TODO = 'Some random Todo'
        FAILING_TODO = 'Some failing Todo'

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

        # should enter a new todo
        new_todo.send_keys(RANDOM_TODO)
        new_todo.send_keys(Keys.RETURN)

        todo = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "(//label[@class])")))
        assert todo.text == RANDOM_TODO, 'Todo text did not match the entered text'

        # should make a proper request to Google Analytics
        requests = driver.get_log('sauce:network')
        assert [item for item in requests if 'ec=pageEvent&ea=addTodo&el=useraction' in item['url']] != [], 'Did not made proper analytics request'

        # should fail entering a new todo after intercepting the request with an error
        driver.execute_script('sauce:intercept', {
            "url": "https://saucecon.herokuapp.com/api/todos",
            "error": "Failed"
        })

        new_todo.send_keys(FAILING_TODO)
        new_todo.send_keys(Keys.RETURN)

        requests = driver.get_log('sauce:network')
        assert [item for item in requests if 'ec=pageEvent&ea=addTodoError&el=useraction' in item['url']] != [], 'Did not made proper analytics request'
