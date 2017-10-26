package com.blackbox.siteSpecific.tests.smoke;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Test;


public class PageAccessTests extends GMFDashboardTest {
    @Test
    public void accessInstancePages() {
        // Set up data
        int serviceIndex;
        String serviceName = "Network Internet Information";
        String serviceVersion;
        String serviceInstanceId;
        int instanceIndex = 1;


        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.dashboard().waitForPageToLoad();
        System.out.println("Successfully accessed the Dashboard page.");

        // Find the desired service and get the version
        serviceIndex = gmfDashboardSite.dashboard().getMainStableServicesEntryIndex(serviceName);
        serviceVersion = gmfDashboardSite.dashboard().getMainStableServiceEntryVersion(serviceIndex);
        System.out.println(String.format("Found service \"%s\" with version \"%s\" at index %d.", serviceName, serviceVersion, serviceIndex));

        // Navigate to the desired service
        gmfDashboardSite.dashboard().navigateToMainStableServiceEntry(serviceIndex);
        gmfDashboardSite.instances().waitForPageToLoad();
        System.out.println("Successfully accessed the Instances page.");

        // Find the desired instance and get the ID
        serviceInstanceId = gmfDashboardSite.instances().getInstanceId(instanceIndex);

        // Navigate to the desired instance and verify the Summary page is loaded
        gmfDashboardSite.instances().navigateToInstance(instanceIndex);
        gmfDashboardSite.summary().waitForPageToLoad();
        System.out.println("Successfully accessed the Summary page.");

        // Navigate to the Routes page and verify the page is loaded
        gmfDashboardSite.summary().navigateToRoutes();
        gmfDashboardSite.routes().waitForPageToLoad();
        System.out.println("Successfully accessed the Routes page.");

        // Navigate to the Threads page and verify the page is loaded
        gmfDashboardSite.routes().navigateToThreads();
        gmfDashboardSite.threads().waitForPageToLoad();
        System.out.println("Successfully accessed the Threads page.");

        // Navigate to the HTTP page and verify the page is loaded
        gmfDashboardSite.threads().navigateToHttp();
        gmfDashboardSite.http().waitForPageToLoad();
        System.out.println("Successfully accessed the HTTP page.");

        // Navigate to the JVM page and verify the page is loaded
        gmfDashboardSite.http().navigateToJvm();
        gmfDashboardSite.jvm().waitForPageToLoad();
        System.out.println("Successfully accessed the JVM page.");

        // Navigate to the Finagle page and verify the page is loaded
        gmfDashboardSite.jvm().navigateToFinagle();
        gmfDashboardSite.finagle().waitForPageToLoad();
        System.out.println("Successfully accessed the Finagle page.");

        // Navigate to the Explorer page and verify the page is loaded
        gmfDashboardSite.finagle().navigateToExplorer();
        gmfDashboardSite.explorer().waitForPageToLoad();
        System.out.println("Successfully accessed the Explorer page.");

        // Navigate to the Settings page and verify it the page is loaded
        gmfDashboardSite.explorer().navigateToSettings();
        gmfDashboardSite.settings().waitForPageToLoad();
        System.out.println("Successfully accessed the Settings page.");
    }
}
