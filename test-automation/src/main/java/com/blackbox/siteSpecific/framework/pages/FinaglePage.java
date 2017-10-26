package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class FinaglePage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String HEADER_TIMER_DEVIATION = "//*[@id=\"main-content\"]/div/div[1]/div/h3";
    private static final String TEXT_TIMER_DEVIATION_COUNT = "//*[@id=\"main-content\"]/div/div[1]/div/div[1]/div[2]";
    private static final String TEXT_TIMER_DEVIATION_AVERAGE = "//*[@id=\"main-content\"]/div/div[1]/div/div[2]/div[2]";
    private static final String TEXT_TIMER_DEVIATION_MAX = "//*[@id=\"main-content\"]/div/div[1]/div/div[3]/div[2]";
    private static final String TEXT_TIMER_DEVIATION_MIN = "//*[@id=\"main-content\"]/div/div[1]/div/div[4]/div[2]";
    private static final String TEXT_TIMER_DEVIATION_SUM = "//*[@id=\"main-content\"]/div/div[1]/div/div[5]/div[2]";

    private static final String HEADER_PENDING_TIMER_TASKS = "//*[@id=\"main-content\"]/div/div[2]/div/h3";
    private static final String TEXT_PENDING_TIMER_TASKS_COUNT = "//*[@id=\"main-content\"]/div/div[2]/div/div[1]/div[2]";
    private static final String TEXT_PENDING_TIMER_TASKS_AVERAGE = "//*[@id=\"main-content\"]/div/div[2]/div/div[2]/div[2]";
    private static final String TEXT_PENDING_TIMER_TASKS_MAX = "//*[@id=\"main-content\"]/div/div[2]/div/div[3]/div[2]";
    private static final String TEXT_PENDING_TIMER_TASKS_MIN = "//*[@id=\"main-content\"]/div/div[2]/div/div[4]/div[2]";
    private static final String TEXT_PENDING_TIMER_TASKS_SUM = "//*[@id=\"main-content\"]/div/div[2]/div/div[5]/div[2]";

    private static final String HEADER_FUTURE_POOL = "//*[@id=\"main-content\"]/div/div[3]/div/h3";
    private static final String TEXT_FUTURE_POOL_ACTIVE_TASKS = "//*[@id=\"main-content\"]/div/div[3]/div/div[1]/div[2]";
    private static final String TEXT_FUTURE_POOL_COMPLETED_TASKS = "//*[@id=\"main-content\"]/div/div[3]/div/div[2]/div[2]";
    private static final String TEXT_FUTURE_POOL_POOL_SIZE = "//*[@id=\"main-content\"]/div/div[3]/div/div[3]/div[2]";

    private static final String HEADER_CLIENT_REGISTRY = "//*[@id=\"main-content\"]/div/div[4]/div/h3";
    private static final String TEXT_CLIENT_REGISTRY_SIZE = "//*[@id=\"main-content\"]/div/div[4]/div/div[1]/div[2]";
    private static final String TEXT_CLIENT_REGISTRY_INITIAL_RESOLUTION = "//*[@id=\"main-content\"]/div/div[4]/div/div[2]/div[2]";

    // </editor-fold>


    public FinaglePage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(HEADER_TIMER_DEVIATION, 60);
        driverutil.waitForVisibleElement(HEADER_PENDING_TIMER_TASKS, 60);
        driverutil.waitForVisibleElement(HEADER_FUTURE_POOL, 60);
        driverutil.waitForVisibleElement(HEADER_CLIENT_REGISTRY, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Timer Deviation Values">

    public boolean isTimerDeviationCountShown() {
        return driverutil.isElementVisible(TEXT_TIMER_DEVIATION_COUNT);
    }

    public int getTimerDeviationCount() {
        return Integer.parseInt(driverutil.getText(TEXT_TIMER_DEVIATION_COUNT).replaceAll(",", ""));
    }

    public boolean isTimerDeviationAverageShown() {
        return driverutil.isElementVisible(TEXT_TIMER_DEVIATION_AVERAGE);
    }

    public double getTimerDeviationAverage() {
        return Double.parseDouble(driverutil.getText(TEXT_TIMER_DEVIATION_AVERAGE).replaceAll(",", ""));
    }

    public boolean isTimerDeviationMaxShown() {
        return driverutil.isElementVisible(TEXT_TIMER_DEVIATION_MAX);
    }

    public int getTimerDeviationMax() {
        return Integer.parseInt(driverutil.getText(TEXT_TIMER_DEVIATION_MAX).replaceAll(",", ""));
    }

    public boolean isTimerDeviationMinShown() {
        return driverutil.isElementVisible(TEXT_TIMER_DEVIATION_MIN);
    }

    public int getTimerDeviationMin() {
        return Integer.parseInt(driverutil.getText(TEXT_TIMER_DEVIATION_MIN).replaceAll(",", ""));
    }

    public boolean isTimerDeviationSumShown() {
        return driverutil.isElementVisible(TEXT_TIMER_DEVIATION_SUM);
    }

    public int getTimerDeviationSum() {
        return Integer.parseInt(driverutil.getText(TEXT_TIMER_DEVIATION_SUM).replaceAll(",", ""));
    }

    // </editor-fold>


    // <editor-fold desc="Pending Timer Tasks Values">

    public boolean isPendingTimerTasksCountShown() {
        return driverutil.isElementVisible(TEXT_PENDING_TIMER_TASKS_COUNT);
    }

    public int getPendingTimerTasksCount() {
        return Integer.parseInt(driverutil.getText(TEXT_PENDING_TIMER_TASKS_COUNT).replaceAll(",", ""));
    }

    public boolean isPendingTimerTasksAverageShown() {
        return driverutil.isElementVisible(TEXT_PENDING_TIMER_TASKS_AVERAGE);
    }

    public double getPendingTimerTasksAverage() {
        return Double.parseDouble(driverutil.getText(TEXT_PENDING_TIMER_TASKS_AVERAGE).replaceAll(",", ""));
    }

    public boolean isPendingTimerTasksMaxShown() {
        return driverutil.isElementVisible(TEXT_PENDING_TIMER_TASKS_MAX);
    }

    public int getPendingTimerTasksMax() {
        return Integer.parseInt(driverutil.getText(TEXT_PENDING_TIMER_TASKS_MAX).replaceAll(",", ""));
    }

    public boolean isPendingTimerTasksMinShown() {
        return driverutil.isElementVisible(TEXT_PENDING_TIMER_TASKS_MIN);
    }

    public int getPendingTimerTasksMin() {
        return Integer.parseInt(driverutil.getText(TEXT_PENDING_TIMER_TASKS_MIN).replaceAll(",", ""));
    }

    public boolean isPendingTimerTasksSumShown() {
        return driverutil.isElementVisible(TEXT_PENDING_TIMER_TASKS_SUM);
    }

    public int getPendingTimerTasksSum() {
        return Integer.parseInt(driverutil.getText(TEXT_PENDING_TIMER_TASKS_SUM).replaceAll(",", ""));
    }

    // </editor-fold>


    // <editor-fold desc="Future Pool Values">

    public boolean isFuturePoolActiveTasksShown() {
        return driverutil.isElementVisible(TEXT_FUTURE_POOL_ACTIVE_TASKS);
    }

    public int getFuturePoolActiveTasks() {
        return Integer.parseInt(driverutil.getText(TEXT_FUTURE_POOL_ACTIVE_TASKS).replaceAll(",", ""));
    }

    public boolean isFuturePoolCompletedTasksShown() {
        return driverutil.isElementVisible(TEXT_FUTURE_POOL_COMPLETED_TASKS);
    }

    public int getFuturePoolCompletedTasks() {
        return Integer.parseInt(driverutil.getText(TEXT_FUTURE_POOL_COMPLETED_TASKS).replaceAll(",", ""));
    }

    public boolean isFuturePoolPoolSizeShown() {
        return driverutil.isElementVisible(TEXT_FUTURE_POOL_POOL_SIZE);
    }

    public int getFuturePoolPoolSize() {
        return Integer.parseInt(driverutil.getText(TEXT_FUTURE_POOL_POOL_SIZE).replaceAll(",", ""));
    }

    // </editor-fold>


    // <editor-fold desc="Client Registry Values">

    public boolean isClientRegistrySizeShown() {
        return driverutil.isElementVisible(TEXT_CLIENT_REGISTRY_SIZE);
    }

    public int getClientRegistrySize() {
        return Integer.parseInt(driverutil.getText(TEXT_CLIENT_REGISTRY_SIZE).replaceAll(",", ""));
    }

    public boolean isClientRegistryInitialResolutionShown() {
        return driverutil.isElementVisible(TEXT_CLIENT_REGISTRY_INITIAL_RESOLUTION);
    }

    public int getClientRegistryInitialResolution() {
        return Integer.parseInt(driverutil.getText(TEXT_CLIENT_REGISTRY_INITIAL_RESOLUTION).replaceAll(",", ""));
    }

    // </editor-fold>
}