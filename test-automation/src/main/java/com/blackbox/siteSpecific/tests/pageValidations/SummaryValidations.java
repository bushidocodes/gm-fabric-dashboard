package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;

import javax.sound.midi.SysexMessage;


public class SummaryValidations extends GMFDashboardTest {
    @Test
    public void validateSummaryPageValues() {
        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Verify and display the Uptime values
        Assert.assertTrue(gmfDashboardSite.summary().isUptimeValueShown());
        Assert.assertTrue(gmfDashboardSite.summary().isUptimeDateTimeShown());
        System.out.println(String.format("Uptime: %s (%s)", gmfDashboardSite.summary().getUptimeValue(), gmfDashboardSite.summary().getUptimeDateTime()));

        // Verify the uptime value on the page matches the uptime value in the sidebar
        Assert.assertTrue(gmfDashboardSite.summary().getUptimeValue().equals(gmfDashboardSite.summary().getSidebarUptimeValue()));

        // Verify and display the Avg. Response Time and Error Rate
        Assert.assertTrue(gmfDashboardSite.summary().isAvgResponseTimeShown());
        Assert.assertTrue(gmfDashboardSite.summary().isErrorRateShown());
        System.out.println(String.format("Avg. Response Time: %s, Error Rate: %s", gmfDashboardSite.summary().getAvgResponseTime(), gmfDashboardSite.summary().getErrorRate()));

        // Verify and display the Cores
        Assert.assertTrue(gmfDashboardSite.summary().isCoresShown());
        System.out.println(String.format("Cores: %s", gmfDashboardSite.summary().getCores()));

        // Verify and display the Host and Port
        Assert.assertTrue(gmfDashboardSite.summary().isHostShown());
        Assert.assertTrue(gmfDashboardSite.summary().isPortShown());
        System.out.println(String.format("Host & Port: %s:%s", gmfDashboardSite.summary().getHost(), gmfDashboardSite.summary().getPort()));
    }
}
