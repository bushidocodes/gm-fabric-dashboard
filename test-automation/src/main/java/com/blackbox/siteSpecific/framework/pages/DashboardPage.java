package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebPage;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardPage;


public class DashboardPage extends GMFDashboardPage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Sidebar Elements">

    private static final String LINK_SIDEBAR_SERVICES = "//*[@id=\"root\"]/div/nav/div/div";

    private static final String LINK_SIDEBAR_SERVICES_DOWN = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[1]";
    private static final String TEXT_SIDEBAR_SERVICES_DOWN_COUNT = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[1]/div/div/div[2]/div[1]";
    private static final String[] LINK_SIDEBAR_SERVICES_DOWN_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[1]/div/div[", "]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[1]/div/div[", "]/div/div/span[1]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[1]/div/div[", "]/div/div/span[2]"};

    private static final String LINK_SIDEBAR_SERVICES_WARNING = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[2]";
    private static final String TEXT_SIDEBAR_SERVICES_WARNING_COUNT = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[2]/div/div/div[2]/div[1]";
    private static final String[] LINK_SIDEBAR_SERVICES_WARNING_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[2]/div/div[", "]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[2]/div/div[", "]/div/div/span[1]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[2]/div/div[", "]/div/div/span[2]"};

    private static final String LINK_SIDEBAR_SERVICES_STABLE = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]";
    private static final String TEXT_SIDEBAR_SERVICES_STABLE_COUNT = "//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div/div[2]/div[1]";
    private static final String[] LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]"};  // First entry starts at index 2
    private static final String[] TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]/div/div/span[1]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]/div/div/span[2]"};

    private static final int SIDEBAR_SERVICES_ENTRY_STARTING_INDEX = 2;

    // </editor-fold>


    public DashboardPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {}  // TODO

    // </editor-fold>


    // <editor-fold desc="Sidebar Actions">

    public void toggleSidebarServices() {
        driverutil.click(LINK_SIDEBAR_SERVICES);
    }

    public boolean isSidebarServicesOpen() {
        return driverutil.isElementVisible(LINK_SIDEBAR_SERVICES_DOWN) && driverutil.isElementVisible(LINK_SIDEBAR_SERVICES_WARNING) && driverutil.isElementVisible(LINK_SIDEBAR_SERVICES_STABLE);
    }

    public void toggleSidebarServicesDown() {
        driverutil.click(LINK_SIDEBAR_SERVICES_DOWN);
    }

    public boolean isSidebarServicesDownOpen() {
        return driverutil.isElementVisible(buildElementLocator(LINK_SIDEBAR_SERVICES_DOWN_ENTRY_SUBSTRINGS, SIDEBAR_SERVICES_ENTRY_STARTING_INDEX));
    }

    public int getSidebarServicesDownCount() {
        return Integer.parseInt(driverutil.getText(TEXT_SIDEBAR_SERVICES_DOWN_COUNT).replaceAll(",", ""));
    }

    public String getSidebarServicesDownEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS, index));
    }

    public String getSidebarServicesDownEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_VERSION_SUBSTRINGS, index));
    }

    public void toggleSidebarServicesWarning() {
        driverutil.click(LINK_SIDEBAR_SERVICES_WARNING);
    }

    public boolean isSidebarServicesWarningOpen() {
        return driverutil.isElementVisible(buildElementLocator(LINK_SIDEBAR_SERVICES_WARNING_ENTRY_SUBSTRINGS, SIDEBAR_SERVICES_ENTRY_STARTING_INDEX));
    }

    public int getSidebarServicesWarningCount() {
        return Integer.parseInt(driverutil.getText(TEXT_SIDEBAR_SERVICES_WARNING_COUNT).replaceAll(",", ""));
    }

    public String getSidebarServicesWarningEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS, index));
    }

    public String getSidebarServicesWarningEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_VERSION_SUBSTRINGS, index));
    }

    public void navigateToSidebarServicesWarningEntry(int index) {
        driverutil.click(buildElementLocator(LINK_SIDEBAR_SERVICES_WARNING_ENTRY_SUBSTRINGS, index));
        // TODO: Will need to return the correct page model once it is created
    }

    public void toggleSidebarServicesStable() {
        driverutil.click(LINK_SIDEBAR_SERVICES_STABLE);
    }

    public boolean isSidebarServicesStableOpen() {
        return driverutil.isElementVisible(buildElementLocator(LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS, SIDEBAR_SERVICES_ENTRY_STARTING_INDEX));
    }

    public int getSidebarServicesStableCount() {
        return Integer.parseInt(driverutil.getText(TEXT_SIDEBAR_SERVICES_STABLE_COUNT).replaceAll(",", ""));
    }

    public String getSidebarServicesStableEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS, index));
    }

    public String getSidebarServicesStableEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS, index));
    }

    public void navigateToSidebarServicesStableEntry(int index) {
        driverutil.click(buildElementLocator(LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS, index));
        // TODO: Will need to return the correct page model once it is created
    }

    // </editor-fold>
}