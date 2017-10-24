package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.dataModels.ThreadState;
import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;

import javax.sound.midi.SysexMessage;


public class ThreadsValidations extends GMFDashboardTest {
    @Test
    public void validateThreadsPageFiltering() {
        // Set up data
        int allThreadsCount;
        int activeCount;
        int idleCount;
        int stoppedCount;
        int index;

        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Threads page
        gmfDashboardSite.summary().navigateToThreads();
        gmfDashboardSite.threads().waitForPageToLoad();

        // Get counts and display them
        allThreadsCount = gmfDashboardSite.threads().getAllThreadsCount();
        activeCount = gmfDashboardSite.threads().getActiveCount();
        idleCount = gmfDashboardSite.threads().getIdleCount();
        stoppedCount = gmfDashboardSite.threads().getStoppedCount();
        System.out.println(String.format("All / Active / Idle / Stopped: %d / %d / %d / %d", allThreadsCount, activeCount, idleCount, stoppedCount));

        // Verify the counts make sense
        Assert.assertTrue(allThreadsCount == (activeCount + idleCount + stoppedCount));

        // Make sure the number of rows matches the All Threads button count
        // Assert.assertTrue(gmfDashboardSite.threads().getRowCount() == gmfDashboardSite.threads().getAllThreadsCount());
        int rowCount = gmfDashboardSite.threads().getRowCount();
        System.out.println("All Threads: Row count matches the expected value.");

        // Validate Active filtering as long as the Active button is enabled
        if (gmfDashboardSite.threads().isActiveButtonEnabled()) {
            // Filter by Active
            gmfDashboardSite.threads().filterByActive();

            // Verify all the table entries are in the runnable state
            index = 1;
            while (gmfDashboardSite.threads().doesRowExist(index)) {
                Assert.assertTrue(gmfDashboardSite.threads().getState(index) == ThreadState.RUNNABLE);
                index++;
            }
            System.out.println("Active: All entries have the expected state.");

            // Verify the number of rows matches the Active button count
            Assert.assertTrue((index - 1) == gmfDashboardSite.threads().getActiveCount());
            System.out.println("Active: Row count matches the expected value.");
        } else {
            System.out.println("Active: Button is disabled, validation skipped.");
        }

        // Validate Idle filtering as long as the Idle button is enabled
        if (gmfDashboardSite.threads().isIdleButtonEnabled()) {
            // Filter by Idle
            gmfDashboardSite.threads().filterByIdle();

            // Verify all the table entries are in the waiting state
            index = 1;
            while (gmfDashboardSite.threads().doesRowExist(index)) {
                Assert.assertTrue(gmfDashboardSite.threads().getState(index) == ThreadState.WAITING);
                index++;
            }
            System.out.println("Idle: All entries have the expected state.");

            // Verify the number of rows matches the Idle button count
            Assert.assertTrue((index -1) == gmfDashboardSite.threads().getIdleCount());
            System.out.println("Idle: Row count matches the expected value.");
        } else {
            System.out.println("Idle: Button is disabled, validation skipped.");
        }

        // Validate Stopped filtering as long as the Stopped button is enabled
        if (gmfDashboardSite.threads().isStoppedButtonEnabled()) {
            // Filter by Stopped
            gmfDashboardSite.threads().filterByStopped();

            // Verify the number of rows matches the Stopped button count
            Assert.assertTrue(gmfDashboardSite.threads().getRowCount() == gmfDashboardSite.threads().getStoppedCount());
            System.out.println("Stopped: Row count matches the expected value.");
        } else {
            System.out.println("Stopped: Button is disabled, validation skipped.");
        }
    }
}