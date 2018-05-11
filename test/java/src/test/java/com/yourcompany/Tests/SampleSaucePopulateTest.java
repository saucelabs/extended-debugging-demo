package com.yourcompany.Tests;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;

public class SampleSaucePopulateTest extends SampleSauceTestBase {

    /**
     * Runs a simple test to show the brittleness of using the UI to interact with the page.
     * Compare this with SaucePrepopulateTest
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyPopulateTest(String browser, String version, String os, Method method)
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

        // populate the todo list one by one
        for (String todo : todoList) {
            newTodo.sendKeys(todo);
            newTodo.sendKeys(Keys.RETURN);
            new WebDriverWait(driver, 5).until(ExpectedConditions.presenceOfElementLocated(By.xpath(String.format("(//label[@class])[text()='%s']", todo))));
        }

        assertEquals(todoList.size(), driver.findElements(By.xpath("(//label[@class])")).size());

    }
}