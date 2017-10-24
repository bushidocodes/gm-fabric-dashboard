package com.blackbox.siteSpecific.tests.smoke;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;


public class PageAccessTests extends GMFDashboardTest {
    @Test
    public void accessSummaryPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);

        // Verify the Summary page is loaded
        gmfDashboardSite.summary().waitForPageToLoad();
    }


    @Test
    public void accessRoutesPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Routes page and verify the page is loaded
        gmfDashboardSite.summary().navigateToRoutes();
        gmfDashboardSite.routes().waitForPageToLoad();
    }


    @Test
    public void accessThreadsPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Threads page and verify the page is loaded
        gmfDashboardSite.summary().navigateToThreads();
        gmfDashboardSite.threads().waitForPageToLoad();
    }


    @Test
    public void accessHttpPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the HTTP page and verify the page is loaded
        gmfDashboardSite.summary().navigateToHttp();
        gmfDashboardSite.http().waitForPageToLoad();
    }


    @Test
    public void accessJvmPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the JVM page and verify the page is loaded
        gmfDashboardSite.summary().navigateToJvm();
        gmfDashboardSite.jvm().waitForPageToLoad();
    }


    @Test
    public void accessFinaglePage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Finagle page and verify the page is loaded
        gmfDashboardSite.summary().navigateToFinagle();
        gmfDashboardSite.finagle().waitForPageToLoad();
    }


    @Test
    public void accessExplorerPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Explorer page and verify the page is loaded
        gmfDashboardSite.summary().navigateToExplorer();
        gmfDashboardSite.explorer().waitForPageToLoad();
    }


    @Test
    public void accessSettingsPage() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Settings page and verify it the page is loaded
        gmfDashboardSite.summary().navigateToSettings();
        gmfDashboardSite.settings().waitForPageToLoad();
    }
}
