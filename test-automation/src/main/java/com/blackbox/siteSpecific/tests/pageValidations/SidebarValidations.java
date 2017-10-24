package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;


public class SidebarValidations extends GMFDashboardTest {
    @Test
    public void validateSidebarHighlighting() {
        // Open the site
        gmfDashboardSite.openSite(deployment);

        // Verify the Summary page is displayed and the link is active
        gmfDashboardSite.summary().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.summary().isSummaryLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.summary().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.summary().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.summary().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.summary().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.summary().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.summary().isExplorerLinkActive());

        // Navigate to the Routes page and verify the link is active
        gmfDashboardSite.summary().navigateToRoutes();
        gmfDashboardSite.routes().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.routes().isRoutesLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.routes().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.routes().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.routes().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.routes().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.routes().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.routes().isExplorerLinkActive());

        // Navigate to the Threads page and verify the link is active
        gmfDashboardSite.routes().navigateToThreads();
        gmfDashboardSite.threads().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.threads().isThreadsLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.threads().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.threads().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.threads().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.threads().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.threads().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.threads().isExplorerLinkActive());

        // Navigate to the HTTP page and verify the link is active
        gmfDashboardSite.threads().navigateToHttp();
        gmfDashboardSite.http().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.http().isHttpLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.http().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.http().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.http().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.http().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.http().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.http().isExplorerLinkActive());

        // Navigate to the JVM page and verify the link is active
        gmfDashboardSite.http().navigateToJvm();
        gmfDashboardSite.jvm().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.jvm().isJvmLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.jvm().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.jvm().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.jvm().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.jvm().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.jvm().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.jvm().isExplorerLinkActive());

        // Navigate to the Finagle page and verify the link is active
        gmfDashboardSite.jvm().navigateToFinagle();
        gmfDashboardSite.finagle().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.finagle().isFinagleLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.finagle().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.finagle().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.finagle().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.finagle().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.finagle().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.finagle().isExplorerLinkActive());

        // Navigate to the Explorer page and verify the link is active
        gmfDashboardSite.finagle().navigateToExplorer();
        gmfDashboardSite.explorer().waitForPageToLoad();
        Assert.assertTrue(gmfDashboardSite.explorer().isExplorerLinkActive());

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.explorer().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.explorer().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.explorer().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.explorer().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.explorer().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.explorer().isFinagleLinkActive());

        // Navigate to the Settings page and verify it is loaded.
        gmfDashboardSite.explorer().navigateToSettings();
        gmfDashboardSite.settings().waitForPageToLoad();

        // Verify the other links are inactive
        Assert.assertFalse(gmfDashboardSite.settings().isSummaryLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isRoutesLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isThreadsLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isHttpLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isJvmLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isFinagleLinkActive());
        Assert.assertFalse(gmfDashboardSite.settings().isExplorerLinkActive());
    }


    @Test
    public void validateSidebarValues() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Validate and display the Summary Uptime value
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarUptimeShown());
        System.out.println(String.format("Uptime: %s", gmfDashboardSite.summary().getSidebarUptimeValue()));

        // Validate and display the Threads Threads value
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarThreadsShown());
        System.out.println(String.format("Threads: %s", gmfDashboardSite.summary().getSidebarThreadsValue()));

        // Validate and display the HTTP HTTP and HTTPS values
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarHttpShown());
        System.out.println(String.format("HTTP: %s", gmfDashboardSite.summary().getSidebarHttpValue()));
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarHttpsShown());
        System.out.println(String.format("HTTPS: %s", gmfDashboardSite.summary().getSidebarHttpsValue()));

        // Validate and display the JVM Mem Used value
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarMemUsedShown());
        System.out.println(String.format("Mem Used: %s", gmfDashboardSite.summary().getSidebarMemUsedValue()));

        // Validate and display the Finagle Active Tasks and Pend Tasks values
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarActiveTasksShown());
        System.out.println(String.format("Active Tasks: %s", gmfDashboardSite.summary().getSidebarActiveTasksValue()));
        Assert.assertTrue(gmfDashboardSite.summary().isSidebarPendTasksShown());
        System.out.println(String.format("Pend. Tasks: %s", gmfDashboardSite.summary().getSidebarPendTasksValue()));
    }
}
