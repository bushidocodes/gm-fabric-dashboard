package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class JvmPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Gray Matter Fabric";

    // <editor-fold desc="Page Elements">

    // </editor-fold>


    public JvmPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        
    }

    // </editor-fold>
}