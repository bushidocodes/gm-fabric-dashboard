package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class JvmPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String HEADER_HEAP = "//*[@id=\"main-content\"]/div/div[1]/div/h3";
    private static final String HEADER_CLASSES = "//*[@id=\"main-content\"]/div/div[2]/div/h3";

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
        driverutil.waitForVisibleElement(HEADER_HEAP, 60);
        driverutil.waitForVisibleElement(HEADER_CLASSES, 60);
    }

    // </editor-fold>
}