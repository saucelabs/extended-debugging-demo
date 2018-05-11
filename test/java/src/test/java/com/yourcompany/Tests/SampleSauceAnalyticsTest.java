package com.yourcompany.Tests;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class SampleSauceAnalyticsTest extends SampleSauceTestBase {

    /**
     * Demonstrates how sauce:intercept custom command can be used to block access to URLs
     * and verified with sauce:network custom command
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyAnalyticsTest(String browser, String version, String os, Method method)
            throws InvalidElementStateException, MalformedURLException {

        String RANDOM_TODO = "Some random Todo";
        String FAILING_TODO = "Some failing Todo";

        this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        // Navigate to the page
        driver.get("https://saucecon.herokuapp.com");
        WebElement newTodo = new WebDriverWait(driver, 5).until(ExpectedConditions.presenceOfElementLocated(By.id("new-todo")));

        // clean up any leftover todos from previous runs
        try {
            while (!driver.findElements(By.className("destroy")).isEmpty()) {
                WebElement button = driver.findElement(By.className("destroy"));
                jsDriver.executeScript("arguments[0].click();", button);
                new WebDriverWait(driver, 1);
            }

        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }

        new WebDriverWait(driver, 1);

        // should enter a new todo
        newTodo.sendKeys(RANDOM_TODO);
        newTodo.sendKeys(Keys.RETURN);

        WebElement todo = new WebDriverWait(driver, 5).until(ExpectedConditions.presenceOfElementLocated(By.xpath("(//label[@class])")));
        assertEquals(todo.getText(), RANDOM_TODO);

        //should make a proper request to Google Analytics
        Map<String, Object> logType = new HashMap<>();
        logType.put("type","sauce:network");
        List<Map<String, Object>> returnValue = (List<Map<String, Object>>) jsDriver.executeScript("sauce:log", logType);

        assertTrue(checkRequestsContainKeyValue(returnValue, "url", "ec=pageEvent&ea=addTodo&el=useraction"));

        Map<String, Object> interceptMap = new HashMap<>();
        interceptMap.put("url", "https://saucecon.herokuapp.com/api/todos");
        interceptMap.put("error", "Failed");
        jsDriver.executeScript("sauce:intercept", interceptMap);

        newTodo.sendKeys(FAILING_TODO);
        newTodo.sendKeys(Keys.RETURN);

        returnValue = (List<Map<String, Object>>) jsDriver.executeScript("sauce:log", logType);
        assertTrue(checkRequestsContainKeyValue(returnValue, "url", "ec=pageEvent&ea=addTodoError&el=useraction"));

    }

    private boolean checkRequestsContainKeyValue(List<Map<String, Object>> requests, String key, String value) {
        for (Map<String, Object> request : requests) {
            if (((String) request.get(key)).contains(value)) {
                return true;
            }
        }
        return false;
    }


}