package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;

import javax.sound.midi.SysexMessage;


public class SummaryValidations extends GMFDashboardTest {
    @Test
    public void validateSummaryPageValues() {
        // Set up data
        String serviceName = "Network Internet Information";
        int instanceIndex = 1;

        String uptimeValue;
        String uptimeDateAndTime;
        String sidebarUptimeValue;
        String avgResponseTime;
        String errorRate;
        String cores;
        String host;
        String port;


        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.dashboard().waitForPageToLoad();

        // Navigate to the desired service
        gmfDashboardSite.dashboard().navigateToMainStableServiceEntry(serviceName);
        gmfDashboardSite.instances().waitForPageToLoad();

        // Navigate to the desired instance and verify the Summary page is loaded
        gmfDashboardSite.instances().navigateToInstance(instanceIndex);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Verify and display the Uptime values
        Assert.assertTrue(gmfDashboardSite.summary().isUptimeValueShown());
        Assert.assertTrue(gmfDashboardSite.summary().isUptimeDateTimeShown());
        uptimeValue = gmfDashboardSite.summary().getUptimeValue();
        uptimeDateAndTime = gmfDashboardSite.summary().getUptimeDateTime();
        System.out.println(String.format("Uptime: %s (%s)", uptimeValue, uptimeDateAndTime));

        // Verify the uptime value on the page matches the uptime value in the sidebar
        sidebarUptimeValue = gmfDashboardSite.summary().getSidebarUptimeValue();
        Assert.assertTrue(uptimeValue.equals(sidebarUptimeValue));  // FIXME: Issue #714

        // Verify and display the Avg. Response Time and Error Rate
        Assert.assertTrue(gmfDashboardSite.summary().isAvgResponseTimeShown());
        Assert.assertTrue(gmfDashboardSite.summary().isErrorRateShown());
        avgResponseTime = gmfDashboardSite.summary().getAvgResponseTime();
        errorRate = gmfDashboardSite.summary().getErrorRate();
        System.out.println(String.format("Avg. Response Time: %s, Error Rate: %s", avgResponseTime, errorRate));

        // Verify and display the Cores
        Assert.assertTrue(gmfDashboardSite.summary().isCoresShown());
        cores = gmfDashboardSite.summary().getCores();
        System.out.println(String.format("Cores: %s", cores));

        // Verify and display the Host and Port
        Assert.assertTrue(gmfDashboardSite.summary().isHostShown());
        Assert.assertTrue(gmfDashboardSite.summary().isPortShown());
        host = gmfDashboardSite.summary().getHost();
        port = gmfDashboardSite.summary().getPort();
        System.out.println(String.format("Host & Port: %s:%s", host, port));
    }
}
