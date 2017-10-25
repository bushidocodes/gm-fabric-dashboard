package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class SettingsPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Gray Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String BUTTON_STOP_RESUME_POLLING = "//*[@id=\"ctrl-btn\"]/button";
    private static final String TEXT_CACHE_SIZE = "//*[@id=\"main-content\"]/div/section[2]/div/div/li/div/span";
    private static final String BUTTON_CLEAR_METRICS_CACHE = "//*[@id=\"main-content\"]/div/section[2]/div/div/button";

    // </editor-fold>


    public SettingsPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(BUTTON_STOP_RESUME_POLLING, 60);
        driverutil.waitForVisibleElement(BUTTON_CLEAR_METRICS_CACHE, 60);
    }

    // </editor-fold>
}