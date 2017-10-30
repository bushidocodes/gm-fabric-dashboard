package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;
import org.junit.Assert;


public class RoutesPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String FIELD_SEARCH_ROUTES = "domclass=form-control";
    private static final String SEARCH_ROUTES_PLACEHOLDER_ATTRIBUTE = "placeholder";
    private static final String SEARCH_ROUTES_PLACEHOLDER_EXPECTED_VALUE = "Search Routes";

    // </editor-fold>


    public RoutesPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(FIELD_SEARCH_ROUTES, 60);
        Assert.assertTrue(driverutil.getAttribute(FIELD_SEARCH_ROUTES, SEARCH_ROUTES_PLACEHOLDER_ATTRIBUTE).equals(SEARCH_ROUTES_PLACEHOLDER_EXPECTED_VALUE));
    }

    // </editor-fold>
}