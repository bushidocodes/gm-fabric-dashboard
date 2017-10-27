package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class SummaryPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String HEADER_TITLE = "//h1[contains(@class, 'PageTitle')]";

    private static final String TEXT_UPTIME_VALUE = "//*[@id=\"main-content\"]/section[1]/div/div/div[1]/div/div[2]/span";
    private static final String TEXT_UPTIME_DATE_TIME = "//*[@id=\"main-content\"]/section[1]/div/div/div[1]/div/div[2]/p";
    private static final String TEXT_AVG_RESPONSE_TIME = "//*[@id=\"main-content\"]/section[1]/div/div/div[2]/div[1]/div[2]/span";
    private static final String TEXT_ERROR_RATE = "//*[@id=\"main-content\"]/section[1]/div/div/div[2]/div[2]/div[2]/span";
    private static final String TEXT_CORES = "//*[@id=\"main-content\"]/section[1]/div/div/div[3]/div/div[2]/span";
    private static final String TEXT_HOST = "//*[@id=\"main-content\"]/section[1]/div/div/div[4]/div[1]/div[2]/span";
    private static final String TEXT_PORT = "//*[@id=\"main-content\"]/section[1]/div/div/div[4]/div[2]/div[2]/span";

    // </editor-fold>


    public SummaryPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(HEADER_TITLE, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Page Values">

    public boolean isUptimeValueShown() {
        return driverutil.isElementVisible(TEXT_UPTIME_VALUE);
    }

    public String getUptimeValue() {
        int timeoutSeconds = 5;
        int attempts = 0;
        String uptime = EMPTY_STRING;
        String notLoadedValue = "0";

        while(attempts < timeoutSeconds) {
            uptime = driverutil.getText(TEXT_UPTIME_VALUE);
            if(uptime.equals(notLoadedValue)) {
                attempts++;
                waitSeconds(1);
            } else {
                break;
            }
        }

        return uptime;
    }

    public boolean isUptimeDateTimeShown() {
        return driverutil.isElementVisible(TEXT_UPTIME_DATE_TIME);
    }

    public String getUptimeDateTime() {
        return driverutil.getText(TEXT_UPTIME_DATE_TIME);
    }

    public boolean isAvgResponseTimeShown() {
        return driverutil.isElementVisible(TEXT_AVG_RESPONSE_TIME);
    }

    public String getAvgResponseTime() {
        return driverutil.getText(TEXT_AVG_RESPONSE_TIME);
    }

    public boolean isErrorRateShown() {
        return driverutil.isElementVisible(TEXT_ERROR_RATE);
    }

    public String getErrorRate() {
        return driverutil.getText(TEXT_ERROR_RATE);
    }

    public boolean isCoresShown() {
        return driverutil.isElementVisible(TEXT_CORES);
    }

    public String getCores() {
        return driverutil.getText(TEXT_CORES);
    }

    public boolean isHostShown() {
        return driverutil.isElementVisible(TEXT_HOST);
    }

    public String getHost() {
        return driverutil.getText(TEXT_HOST);
    }

    public boolean isPortShown() {
        return driverutil.isElementVisible(TEXT_PORT);
    }

    public String getPort() {
        return driverutil.getText(TEXT_PORT);
    }

    // </editor-fold>
}