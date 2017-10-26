package com.blackbox.siteSpecific.framework.pages;

import com.blackbox.common.selenium.DriverUtil;
import com.blackbox.common.selenium.WebSite;
import com.blackbox.siteSpecific.framework.base.GMFDashboardServicePage;


public class HttpPage extends GMFDashboardServicePage {
    private static final String PAGE_TITLE = "Grey Matter Fabric";

    // <editor-fold desc="Page Elements">

    private static final String HEADER_CONNECTIONS = "//*[@id=\"main-content\"]/div/div[1]/div/h3";

    private static final String HEADER_DATA_TRANSFER_RATES = "//*[@id=\"main-content\"]/div/div[2]/div/h3";

    private static final String HEADER_REQUESTS = "//*[@id=\"main-content\"]/div/div[3]/div/h3";
    private static final String TEXT_REQUESTS_HTTP_REQUESTS = "//*[@id=\"main-content\"]/div/div[3]/div/div[2]/div[2]";
    private static final String TEXT_REQUESTS_HTTP_SUCCESS = "//*[@id=\"main-content\"]/div/div[3]/div/div[2]/div[3]";
    private static final String TEXT_REQUESTS_HTTPS_REQUESTS = "//*[@id=\"main-content\"]/div/div[3]/div/div[3]/div[2]";
    private static final String TEXT_REQUESTS_HTTPS_SUCCESS = "//*[@id=\"main-content\"]/div/div[3]/div/div[3]/div[3]";

    private static final String HEADER_RESPONSE_STATUS_CODES = "//*[@id=\"main-content\"]/div/div[4]/div/h3";
    private static final String TEXT_RESPONSE_STATUS_CODES_2XX = "//*[@id=\"main-content\"]/div/div[4]/div/div[1]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_200 = "//*[@id=\"main-content\"]/div/div[4]/div/div[2]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_4XX = "//*[@id=\"main-content\"]/div/div[4]/div/div[3]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_400 = "//*[@id=\"main-content\"]/div/div[4]/div/div[4]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_499 = "//*[@id=\"main-content\"]/div/div[4]/div/div[5]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_5XX = "//*[@id=\"main-content\"]/div/div[4]/div/div[6]/div[2]";
    private static final String TEXT_RESPONSE_STATUS_CODES_500 = "//*[@id=\"main-content\"]/div/div[4]/div/div[7]/div[2]";

    // </editor-fold>


    public HttpPage(DriverUtil driverutil, WebSite webSite) {
        super(driverutil, webSite);
    }

    @Override
    public String getPageTitle() {
        return PAGE_TITLE;
    }


    // <editor-fold desc="Wait for Page to Load">

    public void waitForPageToLoad() {
        driverutil.waitForVisibleElement(HEADER_CONNECTIONS, 60);
        driverutil.waitForVisibleElement(HEADER_DATA_TRANSFER_RATES, 60);
        driverutil.waitForVisibleElement(HEADER_REQUESTS, 60);
        driverutil.waitForVisibleElement(HEADER_RESPONSE_STATUS_CODES, 60);
    }

    // </editor-fold>


    // <editor-fold desc="Requests Values">

    public boolean isRequestsHttpRequestsShown() {
        return driverutil.isElementVisible(TEXT_REQUESTS_HTTP_REQUESTS);
    }

    public int getRequestsHttpRequests() {
        return Integer.parseInt(driverutil.getText(TEXT_REQUESTS_HTTP_REQUESTS).replaceAll(",", ""));
    }

    public boolean isRequestsHttpSuccessShown() {
        return driverutil.isElementVisible(TEXT_REQUESTS_HTTP_SUCCESS);
    }

    public int getRequestsHttpSuccess() {
        return Integer.parseInt(driverutil.getText(TEXT_REQUESTS_HTTP_SUCCESS).replaceAll(",", ""));
    }

    public boolean isRequestsHttpsRequestsShown() {
        return driverutil.isElementVisible(TEXT_REQUESTS_HTTPS_REQUESTS);
    }

    public int getRequestsHttpsRequests() {
        return Integer.parseInt(driverutil.getText(TEXT_REQUESTS_HTTPS_REQUESTS).replaceAll(",", ""));
    }

    public boolean isRequestsHttpsSuccessShown() {
        return driverutil.isElementVisible(TEXT_REQUESTS_HTTPS_SUCCESS);
    }

    public int getRequestsHttpsSuccess() {
        return Integer.parseInt(driverutil.getText(TEXT_REQUESTS_HTTPS_SUCCESS).replaceAll(",", ""));
    }

    // </editor-fold>


    // <editor-fold desc="Response Status Codes Values">

    public boolean isResponseStatusCodes2xxShown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_2XX);
    }

    public int getResponseStatusCodes2xx() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_2XX).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes200Shown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_200);
    }

    public int getResponseStatusCodes200() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_200).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes4xxShown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_4XX);
    }

    public int getResponseStatusCodes4xx() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_4XX).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes400Shown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_400);
    }

    public int getResponseStatusCodes400() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_400).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes499Shown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_499);
    }

    public int getResponseStatusCodes499() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_499).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes5xxShown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_5XX);
    }

    public int getResponseStatusCodes5xx() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_5XX).replaceAll(",", ""));
    }

    public boolean isResponseStatusCodes500Shown() {
        return driverutil.isElementVisible(TEXT_RESPONSE_STATUS_CODES_500);
    }

    public int getResponseStatusCodes500() {
        return Integer.parseInt(driverutil.getText(TEXT_RESPONSE_STATUS_CODES_500).replaceAll(",", ""));
    }

    // </editor-fold>
}