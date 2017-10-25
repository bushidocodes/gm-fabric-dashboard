package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardPage;


public class InstancesPage extends GMFDashboardPage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Sidebar Elements">

    // </editor-fold>


    public InstancesPage(DriverUtil driverutil, WebSite webSite) {
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

    // </editor-fold>


    // <editor-fold desc="Main Section">

    // </editor-fold>
}