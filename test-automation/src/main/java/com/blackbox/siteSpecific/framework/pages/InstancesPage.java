package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardPage;


public class InstancesPage extends GMFDashboardPage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Sidebar Elements">

    private static final String LINK_BACK_TO_DASHBOARD = "domclass=nav-go-up";

    // </editor-fold>


    // <editor-fold desc="Main Page Elements">

    private static final String FIELD_SEARCH_INSTANCES = "domclass=form-control";

    private static final String[] TABLE_ROW_INSTANCE_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]"};
    private static final String[] IMAGE_INSTANCE_STATE_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]/div[1]/img"};
    private static final String[] LINK_INSTANCE_ID_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]/div[2]/a"};
    private static final String[] TEXT_INSTANCE_REQUESTS_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]/div[3]"};
    private static final String[] TEXT_INSTANCE_ERROR_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]/div[4]"};
    private static final String[] TEXT_INSTANCE_UPTIME_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div[2]/ol/li[", "]/div[5]"};

    // </editor-fold>


    public InstancesPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(FIELD_SEARCH_INSTANCES, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Sidebar Actions">

    public DashboardPage navigateToDashboard() {
        driverutil.click(LINK_BACK_TO_DASHBOARD);
        return webSite.setCurrentPage(DashboardPage.class);
    }

    // </editor-fold>


    // <editor-fold desc="Main Page Actions">

    public boolean doesInstanceExist(int index) {
        return driverutil.doesElementExist(buildElementLocator(TABLE_ROW_INSTANCE_SUBSTRINGS, index));
    }

    public String getInstanceId(int index) {
        return driverutil.getText(buildElementLocator(LINK_INSTANCE_ID_SUBSTRINGS, index));
    }

    public String getInstanceRequests(int index) {
        return driverutil.getText(buildElementLocator(TEXT_INSTANCE_REQUESTS_SUBSTRINGS, index));
    }

    public String getInstanceError(int index) {
        return driverutil.getText(buildElementLocator(TEXT_INSTANCE_ERROR_SUBSTRINGS, index));
    }

    public String getInstanceUptime(int index) {
        return driverutil.getText(buildElementLocator(TEXT_INSTANCE_UPTIME_SUBSTRINGS, index));
    }

    public SummaryPage navigateToInstance(int index) {
        driverutil.click(buildElementLocator(LINK_INSTANCE_ID_SUBSTRINGS, index));
        return webSite.setCurrentPage(SummaryPage.class);
    }

    // </editor-fold>
}