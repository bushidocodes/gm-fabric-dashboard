package com.blackbox.siteSpecific.framework.base;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebPage;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.pages.*;


public abstract class GMFDashboardWebPage extends WebPage {
    public final static int defaultTimeOutSeconds = 30;

    public static final String[] OPTIONS_TIME_UNITS = {"Minute", "Hour", "Day", "Week", "Month", "Year"};

    // <editor-fold desc="Sidebar">

    private static final String LINK_FABRIC = "domclass=nav-go-up";

    private static final String LINK_SUMMARY = "//a[@href='#/summary']";
    private static final String TEXT_UPTIME = "//*[@id=\"root\"]/div/nav/div/div[2]/a[1]/div[2]/div/dd/span";

    private static final String LINK_ROUTES = "//a[@href='#/route']";

    private static final String LINK_THREADS = "//a[@href='#/threads']";
    private static final String TEXT_THREADS = "//*[@id=\"root\"]/div/nav/div/div[2]/a[3]/div[2]/div/dd/span";

    private static final String LINK_HTTP = "//a[@href='#/http']";
    private static final String TEXT_HTTP = "//*[@id=\"root\"]/div/nav/div/div[2]/a[4]/div[2]/div[1]/dd/span";
    private static final String TEXT_HTTPS = "//*[@id=\"root\"]/div/nav/div/div[2]/a[4]/div[2]/div[2]/dd/span";

    private static final String LINK_JVM = "//a[@href='#/jvm']";
    private static final String TEXT_MEM_USED = "//*[@id=\"root\"]/div/nav/div/div[2]/a[5]/div[2]/div/dd/span";

    private static final String LINK_FINAGLE = "//a[@href='#/finagle']";
    private static final String TEXT_ACTIVE_TASKS = "//*[@id=\"root\"]/div/nav/div/div[2]/a[6]/div[2]/div[1]/dd/span";
    private static final String TEXT_PEND_TASKS = "//*[@id=\"root\"]/div/nav/div/div[2]/a[6]/div[2]/div[2]/dd/span";

    private static final String LINK_EXPLORER = "//a[@href='#/explorer']";

    private static final String ACTIVE_LINK_ATTRIBUTE = "class";
    private static final String ACTIVE_LINK_VALUE = "active";

    // </editor-fold>


    // <editor-fold desc="Nav Bar">

    private static final String[] TEXT_BREADCRUMB = new String[]{"//*[@id=\"root\"]/div/div/nav/ol/li[", "]"};
    private static final String[] LINK_BREADCRUMB = new String[]{"//*[@id=\"root\"]/div/div/nav/ol/li[", "]/a"};
    private static final int BREADCRUMB_STARTING_INDEX = 1;

    private static final String LINK_SETTINGS = "//a[@href='#/settings']";

    // </editor-fold>
	
	public GMFDashboardWebPage(DriverUtil driverutil, WebSite webSite) {
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


    // <editor-fold desc="Sidebar Navigation">

    public SummaryPage navigateToSummary() {
	    driverutil.click(LINK_SUMMARY);
        return webSite.setCurrentPage(SummaryPage.class);
    }

    public RoutesPage navigateToRoutes() {
	    driverutil.click(LINK_ROUTES);
	    return webSite.setCurrentPage(RoutesPage.class);
    }

    public ThreadsPage navigateToThreads() {
	    driverutil.click(LINK_THREADS);
	    return webSite.setCurrentPage(ThreadsPage.class);
    }

    public HttpPage navigateToHttp() {
	    driverutil.click(LINK_HTTP);
	    return webSite.setCurrentPage(HttpPage.class);
    }

    public JvmPage navigateToJvm() {
	    driverutil.click(LINK_JVM);
	    return webSite.setCurrentPage(JvmPage.class);
    }

    public FinaglePage navigateToFinagle() {
	    driverutil.click(LINK_FINAGLE);
	    return webSite.setCurrentPage(FinaglePage.class);
    }

    public ExplorerPage navigateToExplorer() {
	    driverutil.click(LINK_EXPLORER);
	    return webSite.setCurrentPage(ExplorerPage.class);
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


    // <editor-fold desc="Sidebar Highlighting">

    private boolean isLinkActive(String locator) {
	    return driverutil.getAttribute(locator, ACTIVE_LINK_ATTRIBUTE).contains(ACTIVE_LINK_VALUE);
    }

    public boolean isSummaryLinkActive() {
	    return isLinkActive(LINK_SUMMARY);
    }

    public boolean isRoutesLinkActive() {
	    return isLinkActive(LINK_ROUTES);
    }

    public boolean isThreadsLinkActive() {
	    return isLinkActive(LINK_THREADS);
    }

    public boolean isHttpLinkActive() {
	    return isLinkActive(LINK_HTTP);
    }

    public boolean isJvmLinkActive() {
	    return isLinkActive(LINK_JVM);
    }

    public boolean isFinagleLinkActive() {
	    return isLinkActive(LINK_FINAGLE);
    }

    public boolean isExplorerLinkActive() {
	    return isLinkActive(LINK_EXPLORER);
    }

    // </editor-fold>


    // <editor-fold desc="Sidebar Values">

    public boolean isSidebarUptimeShown() {
	    return driverutil.isElementVisible(TEXT_UPTIME);
    }

    public String getSidebarUptimeValue() {
	    return driverutil.getText(TEXT_UPTIME);
    }

    public boolean isSidebarThreadsShown() {
	    return driverutil.isElementVisible(TEXT_THREADS);
    }

    public int getSidebarThreadsValue() {
	    return Integer.parseInt(driverutil.getText(TEXT_THREADS));
    }

    public boolean isSidebarHttpShown() {
	    return driverutil.isElementVisible(TEXT_HTTP);
    }

    public String getSidebarHttpValue() {
        return driverutil.getText(TEXT_HTTP);
    }

    public boolean isSidebarHttpsShown() {
	    return driverutil.isElementVisible(TEXT_HTTPS);
    }

    public String getSidebarHttpsValue() {
	    return driverutil.getText(TEXT_HTTPS);
    }

    public boolean isSidebarMemUsedShown() {
	    return driverutil.isElementVisible(TEXT_MEM_USED);
    }

    public String getSidebarMemUsedValue() {
        return driverutil.getText(TEXT_MEM_USED);
    }

    public boolean isSidebarActiveTasksShown() {
	    return driverutil.isElementVisible(TEXT_ACTIVE_TASKS);
    }

    public int getSidebarActiveTasksValue() {
	    return Integer.parseInt(driverutil.getText(TEXT_ACTIVE_TASKS));
    }

    public boolean isSidebarPendTasksShown() {
	    return driverutil.isElementVisible(TEXT_PEND_TASKS);
    }

    public int getSidebarPendTasksValue() {
	    return Integer.parseInt(driverutil.getText(TEXT_PEND_TASKS));
    }

    // </editor-fold>
}
