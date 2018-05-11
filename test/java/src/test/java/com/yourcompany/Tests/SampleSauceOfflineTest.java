package com.yourcompany.Tests;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;
import static org.junit.matchers.JUnitMatchers.containsString;

public class SampleSauceOfflineTest extends SampleSauceTestBase {

    /**
     * Demonstrates how sauce:throttle custom command can be used to simulate offline status
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyOfflineInterceptTest(String browser, String version, String os, Method method)
            throws InvalidElementStateException, MalformedURLException {

        this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();

        // Navigate to the page
        driver.get("https://saucecon.herokuapp.com");
        new WebDriverWait(driver, 2);
        assertEquals(driver.getTitle(), "AngularJS \u2022 TodoMVC");

        Map<String, Object> throttleMap = new HashMap<>();
        throttleMap.put("condition","offline");
        ((JavascriptExecutor) driver).executeScript("sauce:throttle", throttleMap);

        driver.get("https://saucecon.herokuapp.com");
        
        WebElement info = new WebDriverWait(driver, 10).until(ExpectedConditions.presenceOfElementLocated(By.id("info")));
        assertThat(info.getText(), containsString("Offline Version"));

        WebElement newTodo = driver.findElement(By.id("new-todo"));
        assertFalse(newTodo.isEnabled());
    }

}