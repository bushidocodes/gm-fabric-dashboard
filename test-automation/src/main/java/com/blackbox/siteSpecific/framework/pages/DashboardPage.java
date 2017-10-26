package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
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
    private static final String[] LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]/div/div/span[1]"};
    private static final String[] TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"root\"]/div/nav/div/div/div[2]/div/div[3]/div/div[", "]/div/div/span[2]"};

    private static final int SIDEBAR_SERVICES_ENTRY_STARTING_INDEX = 2;

    // </editor-fold>


    // <editor-fold desc="Main Page Elements">

    private static final String FIELD_SEARCH_SERVICES = "//input[contains(@class, 'form-control')]";

    private static final String[] ELEMENT_MAIN_SERVICES_DOWN_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[1]/div[2]/div/div[", "]"};
    private static final String[] LINK_MAIN_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[1]/div[2]/div/div[", "]/a"};
    private static final String[] TEXT_MAIN_SERVICES_DOWN_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[1]/div[2]/div/div[", "]/div"};

    private static final String[] ELEMENT_MAIN_SERVICES_WARNING_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[2]/div[2]/div/div[", "]"};
    private static final String[] LINK_MAIN_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[2]/div[2]/div/div[", "]/a"};
    private static final String[] TEXT_MAIN_SERVICES_WARNING_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[2]/div[2]/div/div[", "]/div"};

    private static final String[] ELEMENT_MAIN_SERVICES_STABLE_ENTRY_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[3]/div[2]/div/div[", "]"};
    private static final String[] LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[3]/div[2]/div/div[", "]/a"};
    private static final String[] LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_NOT_AUTHORIZED_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[3]/div[2]/div/div[", "]/div"};
    private static final String[] TEXT_MAIN_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[3]/div[2]/div/div[", "]/div"};
    private static final String[] TEXT_MAIN_SERVICES_STABLE_ENTRY_VERSION_NOT_AUTHORIZED_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/div[3]/div[2]/div/div[", "]/div[2]"};

    private static final int MAIN_SERVICES_ENTRY_STARTING_INDEX = 1;

    // </editor-fold>


    public DashboardPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(FIELD_SEARCH_SERVICES, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Sidebar Actions">

    private int parseSidebarIndex(int index) {
        return SIDEBAR_SERVICES_ENTRY_STARTING_INDEX + (index - 1);
    }

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

    public boolean doesSidebarServicesDownEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(LINK_SIDEBAR_SERVICES_DOWN_ENTRY_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesDownEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesDownEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_DOWN_ENTRY_VERSION_SUBSTRINGS, parseSidebarIndex(index)));
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

    public boolean doesSidebarServicesWarningEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(LINK_SIDEBAR_SERVICES_WARNING_ENTRY_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesWarningEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesWarningEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_WARNING_ENTRY_VERSION_SUBSTRINGS,  parseSidebarIndex(index)));
    }

    public InstancesPage navigateToSidebarServicesWarningEntry(int index) {
        driverutil.click(buildElementLocator(LINK_SIDEBAR_SERVICES_WARNING_ENTRY_SUBSTRINGS, parseSidebarIndex(index)));
        return webSite.setCurrentPage(InstancesPage.class);
    }

    public InstancesPage navigateToSidebarServicesWarningEntry(String name) {
        int index = 1;

        while(doesSidebarServicesWarningEntryExist(index)) {
            if(getSidebarServicesWarningEntryName(index).equals(name)) {
                return navigateToSidebarServicesWarningEntry(index);
            }

            index++;
        }

        // If reached here, the name was not found
        throw new RuntimeException(String.format("Warning service entry could not be found with name \"%s\"", name));
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

    public boolean doesSidebarServicesStableEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesStableEntryName(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public String getSidebarServicesStableEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_SIDEBAR_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS, parseSidebarIndex(index)));
    }

    public InstancesPage navigateToSidebarServicesStableEntry(int index) {
        driverutil.click(buildElementLocator(LINK_SIDEBAR_SERVICES_STABLE_ENTRY_SUBSTRINGS, parseSidebarIndex(index)));
        return webSite.setCurrentPage(InstancesPage.class);
    }

    public InstancesPage navigateToSidebarServicesStableEntry(String name) {
        int index = 1;

        while(doesSidebarServicesStableEntryExist(index)) {
            if(getSidebarServicesStableEntryName(index).equals(name)) {
                return navigateToSidebarServicesStableEntry(index);
            }

            index++;
        }

        // If reached here, the name was not found
        throw new RuntimeException(String.format("Stable service entry could not be found with name \"%s\"", name));
    }

    // </editor-fold>


    // <editor-fold desc="Main Section">

    public int parseMainIndex(int index) {
        return MAIN_SERVICES_ENTRY_STARTING_INDEX + (index - 1);
    }

    public boolean doesMainDownServiceEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(LINK_MAIN_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
    }

    public String getMainDownServiceEntryName(int index) {
        return driverutil.getText(buildElementLocator(LINK_MAIN_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
    }

    public String getMainDownServiceEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_MAIN_SERVICES_DOWN_ENTRY_VERSION_SUBSTRINGS, parseMainIndex(index)));
    }

    public boolean doesMainWarningServiceEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(LINK_MAIN_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
    }

    public String getMainWarningServiceEntryName(int index) {
        return driverutil.getText(buildElementLocator(LINK_MAIN_SERVICES_DOWN_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
    }

    public String getMainWarningServiceEntryVersion(int index) {
        return driverutil.getText(buildElementLocator(TEXT_MAIN_SERVICES_WARNING_ENTRY_VERSION_SUBSTRINGS, parseMainIndex(index)));
    }

    public InstancesPage navigateToMainWarningServiceEntry(int index) {
        driverutil.click(buildElementLocator(LINK_MAIN_SERVICES_WARNING_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
        return webSite.setCurrentPage(InstancesPage.class);
    }

    public InstancesPage navigateToMainWarningServiceEntry(String name) {
        int index = 1;

        while(doesMainWarningServiceEntryExist(index)) {
            if(getMainWarningServiceEntryName(index).equals(name)) {
                return navigateToMainWarningServiceEntry(index);
            }

            index++;
        }

        // If reached here, the name was not found
        throw new RuntimeException(String.format("Warning service entry could not be found with name \"%s\"", name));
    }

    public boolean doesMainStableServiceEntryExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(ELEMENT_MAIN_SERVICES_STABLE_ENTRY_SUBSTRINGS, parseMainIndex(index)));
    }

    public boolean isMainStableServiceEntryAuthorized(int index) {
        if(doesMainStableServiceEntryExist(index)) {
            if (driverutil.doesElementExist(buildElementLocator(LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)))) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new RuntimeException(String.format("No stable service found with index %d", index));
        }
    }

    public String getMainStableServiceEntryName(int index) {
        if(isMainStableServiceEntryAuthorized(index)) {
            return driverutil.getText(buildElementLocator(LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
        } else {
            return driverutil.getText(buildElementLocator(LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_NOT_AUTHORIZED_SUBSTRINGS, parseMainIndex(index)));
        }
    }

    public String getMainStableServiceEntryVersion(int index) {
        if(isMainStableServiceEntryAuthorized(index)) {
            return driverutil.getText(buildElementLocator(TEXT_MAIN_SERVICES_STABLE_ENTRY_VERSION_SUBSTRINGS, parseMainIndex(index)));
        } else {
            return driverutil.getText(buildElementLocator(TEXT_MAIN_SERVICES_STABLE_ENTRY_VERSION_NOT_AUTHORIZED_SUBSTRINGS, parseMainIndex(index)));
        }
    }

    public InstancesPage navigateToMainStableServiceEntry(int index) {
        driverutil.click(buildElementLocator(LINK_MAIN_SERVICES_STABLE_ENTRY_NAME_SUBSTRINGS, parseMainIndex(index)));
        return webSite.setCurrentPage(InstancesPage.class);
    }

    public InstancesPage navigateToMainStableServiceEntry(String name) {
        int index = 1;

        while(doesMainStableServiceEntryExist(index)) {
            if(getMainStableServiceEntryName(index).equals(name)) {
                return navigateToMainStableServiceEntry(index);
            }

            index++;
        }

        // If reached here, the name was not found
        throw new RuntimeException(String.format("Stable service entry could not be found with the name \"%s\"", name));
    }

    // </editor-fold>
}