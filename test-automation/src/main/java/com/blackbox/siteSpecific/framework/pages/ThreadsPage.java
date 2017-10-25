package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.dataModels.ThreadState;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class ThreadsPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Gray Matter Fabric";

    // <editor-fold desc="Elements">

    private static final String BUTTON_ALL_THREADS = "//button[@title='All Threads']";
    private static final String TEXT_ALL_THREADS_COUNT = "//button[@title='All Threads']/span/span";
    private static final String BUTTON_ACTIVE = "//button[@title='Active']";
    private static final String TEXT_ACTIVE_COUNT = "//button[@title='Active']/span/span";
    private static final String BUTTON_IDLE = "//button[@title='Idle']";
    private static final String TEXT_IDLE_COUNT = "//button[@title='Idle']/span/span";
    private static final String BUTTON_STOPPED = "//button[@title='Stopped']";
    private static final String TEXT_STOPPED_COUNT = "//button[@title='Stopped']/span/span";

    private static final String BUTTON_DISABLED_ATTRIBUTE = "disabled";

    //
    // //*[@id="main-content"]/div/div/div[2]/ol/li[2]

    public static final String[] TABLE_ROW_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]"};

    public static final String[] TABLE_CELL_ID_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[1]"};

    public static final String[] TABLE_CELL_STATE_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[2]"};
    public static final String[] TABLE_CELL_STATE_VALUE_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[2]/span/*[name()='svg']/*[name()='circle']"};
    public static final String TABLE_CELL_STATE_VALUE_ATTRIBUTE = "fill";

    public static final String[] TABLE_CELL_TRACE_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[3]"};
    public static final String[] TABLE_CELL_TRACE_HAMBURGER_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[3]/span"};

    public static final String[] TABLE_CELL_NAME_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[4]"};

    public static final String[] TABLE_CELL_DAEMON_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[5]"};

    public static final String[] TABLE_CELL_PRIORITY_SUBSTRINGS = new String[]{"//*[@id=\"main-content\"]/div/div/div[2]/ol/li[", "]/div[6]"};

    public static final String DAEMON_TRUE_VALUE = "Yes";
    public static final String DAEMON_FALSE_VALUE = "No";

    // </editor-fold>


    public ThreadsPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(BUTTON_ALL_THREADS, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Thread Filtering">

    public void filterByAllThreads() {
        driverutil.click(BUTTON_ALL_THREADS);
    }

    public int getAllThreadsCount() {
        return Integer.parseInt(driverutil.getText(TEXT_ALL_THREADS_COUNT));
    }

    public boolean isActiveButtonEnabled() {
        return !driverutil.isAttributePresent(BUTTON_ACTIVE, BUTTON_DISABLED_ATTRIBUTE);
    }

    public int getActiveCount() {
        if (isActiveButtonEnabled()) {
            return Integer.parseInt(driverutil.getText(TEXT_ACTIVE_COUNT));
        } else {
            return 0;
        }
    }

    public void filterByActive() {
        driverutil.click(BUTTON_ACTIVE);
    }

    public boolean isIdleButtonEnabled() {
        return !driverutil.isAttributePresent(BUTTON_IDLE, BUTTON_DISABLED_ATTRIBUTE);
    }

    public int getIdleCount() {
        if (isIdleButtonEnabled()) {
            return Integer.parseInt(driverutil.getText(TEXT_IDLE_COUNT));
        } else {
            return 0;
        }
    }

    public void filterByIdle() {
        driverutil.click(BUTTON_IDLE);
    }

    public boolean isStoppedButtonEnabled() {
        return !driverutil.isAttributePresent(BUTTON_STOPPED, BUTTON_DISABLED_ATTRIBUTE);
    }

    public int getStoppedCount() {
        if (isStoppedButtonEnabled()) {
            return Integer.parseInt(driverutil.getText(TEXT_STOPPED_COUNT));
        } else {
            return 0;
        }
    }

    public void filterByStopped() {
        driverutil.click(BUTTON_STOPPED);
    }

    // </editor-fold>


    // <editor-fold desc="Table Data">

    public boolean doesRowExist(int index) {
        return driverutil.isElementVisible(buildElementLocator(TABLE_ROW_SUBSTRINGS, index));
    }

    public int getRowCount() {
        int index = 0;

        while (doesRowExist(index + 1)) {
            index++;
        }

        return index;
    }

    public int getId(int index) {
        return Integer.parseInt(driverutil.getText(buildElementLocator(TABLE_CELL_ID_SUBSTRINGS, index)));
    }

    public ThreadState getState(int index) {
        String state = driverutil.getAttribute(buildElementLocator(TABLE_CELL_STATE_VALUE_SUBSTRINGS, index), TABLE_CELL_STATE_VALUE_ATTRIBUTE);

        if (state.equals(ThreadState.RUNNABLE.toString())) {
            return ThreadState.RUNNABLE;
        } else if (state.equals(ThreadState.WAITING.toString())) {
            return ThreadState.WAITING;
        } else {
            throw new RuntimeException(String.format("Unexpected state: %s", state));
        }
    }

    public boolean hasTrace(int index) {
        return driverutil.doesElementExist(buildElementLocator(TABLE_CELL_TRACE_HAMBURGER_SUBSTRINGS, index));
    }

    public String getName(int index) {
        return driverutil.getText(buildElementLocator(TABLE_CELL_NAME_SUBSTRINGS, index));
    }

    public boolean isDaemon(int index) {
        String daemonValue = driverutil.getText(buildElementLocator(TABLE_CELL_DAEMON_SUBSTRINGS, index));

        if (daemonValue.equals(DAEMON_TRUE_VALUE)) {
            return true;
        } else if (daemonValue.equals(DAEMON_FALSE_VALUE)) {
            return false;
        } else {
            throw new RuntimeException(String.format("Unexpected Daemon value: %s", daemonValue));
        }
    }

    public int getPriority(int index) {
        return Integer.parseInt(driverutil.getText(buildElementLocator(TABLE_CELL_PRIORITY_SUBSTRINGS, index)));
    }

    // </editor-fold>
}