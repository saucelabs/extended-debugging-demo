package com.yourcompany.Tests;

import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.*;
import java.util.stream.Collectors;
import static org.junit.Assert.assertTrue;

public class SampleSaucePageLoadTest extends SampleSauceTestBase {

    /**
     * Demo showing how 3rd-party scripts can slow down a page
     * Compare this with SauceBlockedTest
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyPageLoadTest(String browser, String version, String os, Method method)
            throws InvalidElementStateException, MalformedURLException {

        this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        driver.get("https://saucecon.herokuapp.com");

        Map<String, Object> logType = new HashMap<>();
        logType.put("type","sauce:performance");
        List<Map<String, Object>> returnValue = (List<Map<String, Object>>) jsDriver.executeScript("sauce:log", logType);
        Map<String, Object> metrics = returnValue.stream().collect(Collectors.toMap(m -> (String) m.get("name"), m -> m.get("value")));
        double pageLoadTime = (double)metrics.get("load");
        assertTrue(pageLoadTime < 5);
    }

    @AfterMethod
    public void displayLoadTimes()
            throws InvalidElementStateException {
        //this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        Map<String, Object> logType = new HashMap<>();
        logType.put("type", "sauce:network");
        List<Map<String, Object>> requests = (List<Map<String, Object>>) jsDriver.executeScript("sauce:log", logType);
        List<Map<String, Object>> timingsPerUrl = new ArrayList<>();
        for (Map<String, Object> request : requests) {
            Map<String, Object> timingEntry = new HashMap<>();
            timingEntry.put("url", request.get("url"));
            timingEntry.put("loadTime", this.getLoadTime(request));
            timingsPerUrl.add(timingEntry);
        }

        timingsPerUrl.sort((first, second) -> ((Double) second.get("loadTime")).compareTo(((Double) first.get("loadTime"))));

        int i = 0;
        for (Map<String, Object> entry : timingsPerUrl) {
            System.out.format("\n%s: URL: %s\nload time %sms\n", i, entry.get("url"), Math.round((double) entry.get("loadTime")));
            i++;
        }
    }

}
