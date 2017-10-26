package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;


public class FinagleValidations extends GMFDashboardTest {
    @Test
    public void validateFinaglePageValues() {
        // Set up data
        String serviceName = "Network Internet Information";
        int instanceIndex = 1;

        int timerDeviationCount;
        double timerDeviationAverage;
        int timerDeviationMax;
        int timerDeviationMin;
        int timerDeviationSum;

        int pendingTimerTasksCount;
        double pendingTimerTasksAverage;
        int pendingTimerTasksMax;
        int pendingTimerTasksMin;
        int pendingTimerTasksSum;

        int futurePoolActiveTasks;
        int futurePoolCompletedTasks;
        int futurePoolPoolSize;

        int clientRegistrySize;
        int clientRegistryInitialResolution;

        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.dashboard().waitForPageToLoad();

        // Navigate to the desired service
        gmfDashboardSite.dashboard().navigateToMainStableServiceEntry(serviceName);
        gmfDashboardSite.instances().waitForPageToLoad();

        // Navigate to the desired instance and verify the Summary page is loaded
        gmfDashboardSite.instances().navigateToInstance(instanceIndex);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the Finagle page
        gmfDashboardSite.summary().navigateToFinagle();
        gmfDashboardSite.finagle().waitForPageToLoad();

        // Verify the Timer Deviation values are shown
        Assert.assertTrue(gmfDashboardSite.finagle().isTimerDeviationCountShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isTimerDeviationAverageShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isTimerDeviationMaxShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isTimerDeviationMinShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isTimerDeviationSumShown());
        System.out.println("Timer Deviation: All expected values are shown.");

        // Get the Timer Deviation values
        timerDeviationCount = gmfDashboardSite.finagle().getTimerDeviationCount();
        timerDeviationAverage = gmfDashboardSite.finagle().getTimerDeviationAverage();
        timerDeviationMax = gmfDashboardSite.finagle().getTimerDeviationMax();
        timerDeviationMin = gmfDashboardSite.finagle().getTimerDeviationMin();
        timerDeviationSum = gmfDashboardSite.finagle().getTimerDeviationSum();

        // Verify that the Timer Deviation values make sense
        Assert.assertTrue(timerDeviationMax >= timerDeviationMin);
        Assert.assertTrue((timerDeviationAverage <= timerDeviationMax) && (timerDeviationAverage >= timerDeviationMin));
        System.out.println("Timer Deviation: Values make sense.");

        // Display the Timer Deviation values
        System.out.println(String.format("Timer Deviation Count: %d", timerDeviationCount));
        System.out.println(String.format("Timer Deviation Average: %f", timerDeviationAverage));
        System.out.println(String.format("Timer Deviation Max: %d", timerDeviationMax));
        System.out.println(String.format("Timer Deviation Min: %d", timerDeviationMin));
        System.out.println(String.format("Timer Deviation Sum: %d", timerDeviationSum));

        // Verify the Pending Timer Tasks values are shown
        Assert.assertTrue(gmfDashboardSite.finagle().isPendingTimerTasksCountShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isPendingTimerTasksAverageShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isPendingTimerTasksMaxShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isPendingTimerTasksMinShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isPendingTimerTasksSumShown());
        System.out.println("Pending Timer Tasks: All expected values are shown.");

        // Get the Pending Timer Tasks values
        pendingTimerTasksCount = gmfDashboardSite.finagle().getPendingTimerTasksCount();
        pendingTimerTasksAverage = gmfDashboardSite.finagle().getPendingTimerTasksAverage();
        pendingTimerTasksMax = gmfDashboardSite.finagle().getPendingTimerTasksMax();
        pendingTimerTasksMin = gmfDashboardSite.finagle().getPendingTimerTasksMin();
        pendingTimerTasksSum = gmfDashboardSite.finagle().getPendingTimerTasksSum();

        // Verify that the Pending Timer Tasks values make sense
        Assert.assertTrue(pendingTimerTasksMax >= pendingTimerTasksMin);
        Assert.assertTrue((pendingTimerTasksAverage <= pendingTimerTasksMax) && (pendingTimerTasksAverage >= pendingTimerTasksMin));
        Assert.assertTrue(pendingTimerTasksCount == gmfDashboardSite.finagle().getSidebarPendTasksValue());
        System.out.println("Pending Timer Tasks: Values make sense.");

        // Display the Pending Timer Tasks values
        System.out.println(String.format("Pending Timer Tasks Count: %d", pendingTimerTasksCount));
        System.out.println(String.format("Pending Timer Tasks Average: %f", pendingTimerTasksAverage));
        System.out.println(String.format("Pending Timer Tasks Max: %d", pendingTimerTasksMax));
        System.out.println(String.format("Pending Timer Tasks Min: %d", pendingTimerTasksMin));
        System.out.println(String.format("Pending Timer Tasks Sum: %d", pendingTimerTasksSum));

        // Verify the Future Pool values are shown
        Assert.assertTrue(gmfDashboardSite.finagle().isFuturePoolActiveTasksShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isFuturePoolCompletedTasksShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isFuturePoolPoolSizeShown());
        System.out.println("Future Pool: All expected values are shown.");

        // Get the Future Pool values
        futurePoolActiveTasks = gmfDashboardSite.finagle().getFuturePoolActiveTasks();
        futurePoolCompletedTasks = gmfDashboardSite.finagle().getFuturePoolCompletedTasks();
        futurePoolPoolSize = gmfDashboardSite.finagle().getFuturePoolPoolSize();

        // Verify that the Future Pool values make sense
        Assert.assertTrue(futurePoolActiveTasks == gmfDashboardSite.finagle().getSidebarActiveTasksValue());
        System.out.println("Future Pool: Values make sense.");

        // Display the Future Pool values
        System.out.println(String.format("Future Pool Active Tasks: %d", futurePoolActiveTasks));
        System.out.println(String.format("Future Pool Completed Tasks: %d", futurePoolCompletedTasks));
        System.out.println(String.format("Future Pool Pool Size: %d", futurePoolPoolSize));

        // Verify the Client Registry values are shown
        Assert.assertTrue(gmfDashboardSite.finagle().isClientRegistrySizeShown());
        Assert.assertTrue(gmfDashboardSite.finagle().isClientRegistryInitialResolutionShown());
        System.out.println("Client Registry: All expected values are shown.");

        // Get the Client Registry values
        clientRegistrySize = gmfDashboardSite.finagle().getClientRegistrySize();
        clientRegistryInitialResolution = gmfDashboardSite.finagle().getClientRegistryInitialResolution();

        // Display the Client Registry values
        System.out.println(String.format("Client Registry Size: %d", clientRegistrySize));
        System.out.println(String.format("Client Registry Initial Resolution: %d", clientRegistryInitialResolution));
    }
}
