package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;
import org.junit.Assert;


public class FunctionsPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String FIELD_SEARCH_FUNCTIONS = "domclass=form-control";
    private static final String SEARCH_FUNCTIONS_PLACEHOLDER_ATTRIBUTE = "placeholder";
    private static final String SEARCH_FUNCTIONS_PLACEHOLDER_EXPECTED_VALUE = "Search Functions";

    // </editor-fold>


    public FunctionsPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(FIELD_SEARCH_FUNCTIONS, 60);
        Assert.assertTrue(driverutil.getAttribute(FIELD_SEARCH_FUNCTIONS, SEARCH_FUNCTIONS_PLACEHOLDER_ATTRIBUTE).equals(SEARCH_FUNCTIONS_PLACEHOLDER_EXPECTED_VALUE));
    }

    // </editor-fold>
}