package com.yourcompany.Tests;

import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.*;

import static org.junit.Assert.assertTrue;

public class SampleSauceBlockedTest extends SampleSauceTestBase {

    /**
     * Demonstrates how sauce:intercept custom command can be used to block access to slow-loading
     * 3rd-party scripts and verified with sauce:metrics and sauce:network custom commands.
     * Compare this with SaucePageLoadTest
     */
    @org.testng.annotations.Test(dataProvider = "hardCodedBrowsers")
    public void verifyBlockedTest(String browser, String version, String os, Method method)
            throws InvalidElementStateException, MalformedURLException {

        this.createDriver(browser, version, os, method.getName());
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        // block the 3rd party script
        driver.get("https://saucecon.herokuapp.com");
 
        Map<String, String> interceptMap = new HashMap<>();
        interceptMap.put("url", "https://saucecon.herokuapp.com/thirdPartyScript.js");
        interceptMap.put("error", "Failed");
        jsDriver.executeScript("sauce:intercept", interceptMap);

        //it should load fast
        driver.get("https://saucecon.herokuapp.com");
        Map<String, Object> logType = new HashMap<>();
        logType.put("type","sauce:metrics");
        Map<String, Object> metrics = (Map<String, Object>) jsDriver.executeScript("sauce:log", logType);
        double pageLoadTime = (double)metrics.get("domContentLoaded") - (double)metrics.get("navigationStart");
        assertTrue(pageLoadTime < 5);

        logType.put("type","sauce:performance");
        Map<String, Object> performance = (Map<String, Object>) jsDriver.executeScript("sauce:log", logType);
        assertTrue((double) performance.get("speedIndex") < 1500);
    }

    @AfterMethod
    public void displayLoadTimes()
            throws InvalidElementStateException {
        WebDriver driver = this.getWebDriver();
        JavascriptExecutor jsDriver = (JavascriptExecutor) driver;

        Map<String, Object> logType = new HashMap<>();
        logType.put("type", "sauce:network");
        List<Map<String, Object>> requests = (List<Map<String, Object>>) jsDriver.executeScript("sauce:log", logType);
        List<Map<String, Object>> timingsPerUrl = new ArrayList<>();
        for (Map<String, Object> request : requests) {
            HashMap<String, Object> timingEntry = new HashMap<>();
            timingEntry.put("url", request.get("url"));
            timingEntry.put("loadTime", this.getLoadTime(request));
            timingsPerUrl.add(timingEntry);
        }

        timingsPerUrl.sort((first, second) -> ((Double) second.get("loadTime")).compareTo(((Double) first.get("loadTime"))));

        int i = 0;
        for (Map<String, Object> entry : timingsPerUrl) {
            System.out.format("\n\n%s: URL: %s\nload time %sms", i, entry.get("url"), Math.round((double) entry.get("loadTime")));
            i++;
        }
    }

}