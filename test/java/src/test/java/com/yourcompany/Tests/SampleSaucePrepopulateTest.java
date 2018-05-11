package com.yourcompany.Tests;

import org.openqa.selenium.By;
import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.Method;
import java.net.MalformedURLException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;

public class SampleSaucePrepopulateTest extends SampleSauceTestBase {

    /**
     * Demonstrates how sauce:intercept custom command can be used to prepopulate a page without
     * manually setting things up through the UI
     * Compare this with SaucePopulateTest
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyPrepopulateTest(String browser, String version, String os, Method method)
            throws InvalidElementStateException, MalformedURLException {

        List<String> todoList = Stream.of(
                "Prepare proposal for SauceCon 2018",
                "Get feedback from colleagues",
                "Submit CFP",
                "Wait for response from organizer",
                "Create the outline of the talk",
                "Build slides",
                "Rehearse talk",
                "Go to SauceCon at Parc 55",
                "Present talk at Saucecon",
                "Evaluate Feedback"
        ).collect(Collectors.toList());

        List<Map> todoMap = new ArrayList();
        for (String title : todoList) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("id", todoList.indexOf(title));
            entry.put("title", title);
            entry.put("completed", false);
            todoMap.add(entry);
        }

        this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        Map<String, Object> bodyMap = new HashMap<>();
        bodyMap.put("body", todoMap);

        Map<String, Object> interceptMap = new HashMap<>();
        interceptMap.put("url", "https://saucecon.herokuapp.com/api/todos");
        interceptMap.put("response", bodyMap);

        jsDriver.executeScript("sauce:intercept", interceptMap);

        // Navigate to the page
        driver.get("https://saucecon.herokuapp.com");
        new WebDriverWait(driver, 5).until(ExpectedConditions.presenceOfElementLocated(By.id("new-todo")));

        assertEquals(todoList.size(), driver.findElements(By.xpath("(//label[@class])")).size());

    }
}