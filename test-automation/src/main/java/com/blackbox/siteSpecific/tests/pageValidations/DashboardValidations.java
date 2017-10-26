package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;


public class DashboardValidations extends GMFDashboardTest {
    @Test
    public void validateDashboardPage() {
        // Set up data
        int downServicesSidebarCount;
        int warningServicesSidebarCount;
        int stableServicesSidebarCount;

        int downServicesCount;
        int warningServicesCount;
        int stableServicesCount;

        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.dashboard().waitForPageToLoad();

        // Toggle Services open in the sidebar if it is not already open
        if(!gmfDashboardSite.dashboard().isSidebarServicesOpen()) {
            gmfDashboardSite.dashboard().toggleSidebarServices();
        }

        // Get the service status counts from the sidebar
        downServicesSidebarCount = gmfDashboardSite.dashboard().getSidebarServicesDownCount();
        warningServicesSidebarCount = gmfDashboardSite.dashboard().getSidebarServicesWarningCount();
        stableServicesSidebarCount = gmfDashboardSite.dashboard().getSidebarServicesStableCount();

        // Count the services in each state listed on the main page
        downServicesCount = gmfDashboardSite.dashboard().getMainDownServiceCount();
        warningServicesCount = gmfDashboardSite.dashboard().getMainWarningServiceCount();
        stableServicesCount = gmfDashboardSite.dashboard().getMainStableServiceCount();

        // Verify that the sidebar service status counts match the services counted on the main page
        Assert.assertTrue(downServicesCount == downServicesSidebarCount);
        Assert.assertTrue(warningServicesCount == warningServicesSidebarCount);
        Assert.assertTrue(stableServicesCount == stableServicesSidebarCount);
    }
}
