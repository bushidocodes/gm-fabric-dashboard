package com.blackbox.siteSpecific.framework.base;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebPage;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.pages.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;


public abstract class GMFDashboardPage extends WebPage {
    public final static int defaultTimeOutSeconds = 30;

    public static final String[] OPTIONS_TIME_UNITS = {"Minute", "Hour", "Day", "Week", "Month", "Year"};


    // <editor-fold desc="Nav Bar">

    private static final String[] TEXT_BREADCRUMB = new String[]{"//*[@id=\"root\"]/div/div/nav/ol/li[", "]"};
    private static final String[] LINK_BREADCRUMB = new String[]{"//*[@id=\"root\"]/div/div/nav/ol/li[", "]/a"};
    private static final int BREADCRUMB_STARTING_INDEX = 1;

    private static final String LINK_SETTINGS = "//a[@href='#/settings']";

    // </editor-fold>

	public GMFDashboardPage(DriverUtil driverutil, WebSite webSite) {
		super(driverutil, webSite);
	}


    // <editor-fold desc="Wait a Number of Seconds">

    public void waitSeconds(int seconds) {
		try {
			TimeUnit.SECONDS.sleep(seconds);
		} catch(InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
	}

    // </editor-fold>


    // <editor-fold desc="Date Range Validation">

    public boolean isDateWithinRange(String value, String lowerLimit, String upperLimit) {
        String expectedDateFormat = "MM/dd/yyyy";
        String parseError = String.format("The date string '%s' could not be parsed, must be of format '%s'", value, expectedDateFormat);
        SimpleDateFormat dateFormatter = new SimpleDateFormat(expectedDateFormat);
        Date dateValue, dateLowerLimit, dateUpperLimit;

        // Parse the date to be validated
        try { dateValue = dateFormatter.parse(value); }
        catch(ParseException pe) { throw new RuntimeException(parseError); }

        // Parse the lower limit date
        try { dateLowerLimit = dateFormatter.parse(lowerLimit); }
        catch(ParseException pe) { throw new RuntimeException(parseError); }

        // Parse the upper limit date
        try { dateUpperLimit = dateFormatter.parse(upperLimit); }
        catch(ParseException pe) { throw new RuntimeException(parseError); }

        return isDateWithinRange(dateValue, dateLowerLimit, dateUpperLimit);
    }

    public boolean isDateWithinRange(Date value, Date lowerLimit, Date upperLimit) {
        return (value.compareTo(lowerLimit) >= 0) && (value.compareTo(upperLimit) <= 0);
    }

    // </editor-fold>


    // <editor-fold desc="Build Element Locators">

    public String buildElementLocator(String[] elementSubstrings, int elementIndex) {
        return String.format("%s%d%s", elementSubstrings[0], elementIndex, elementSubstrings[1]);
    }

    public String buildElementLocator(String[] elementSubstrings, int[] elementIndices) {
        String elementLocator = "";

        // Put all the parts of the locator together except for the last string portion
        for(int index = 0; index < elementSubstrings.length - 1; index++) {
            elementLocator = String.format("%s%s%d", elementLocator, elementSubstrings[index], elementIndices[index]);
        }

        // Add the last string portion
        elementLocator = String.format("%s%s", elementLocator, elementSubstrings[elementSubstrings.length - 1]);

        return elementLocator;
    }

    // </editor-fold>


    // <editor-fold desc="Nav Bar Navigation">

    public SummaryPage navigateToRootBreadcrumb() {
	    driverutil.click(buildElementLocator(LINK_BREADCRUMB, BREADCRUMB_STARTING_INDEX));
	    return webSite.setCurrentPage(SummaryPage.class);
    }

    public SettingsPage navigateToSettings() {
	    driverutil.click(LINK_SETTINGS);
	    return webSite.setCurrentPage(SettingsPage.class);
    }

    // </editor-fold>
}
