package com.blackbox.siteSpecific.tests.pageValidations;

import com.blackbox.siteSpecific.framework.base.GMFDashboardTest;
import org.junit.Assert;
import org.junit.Test;


public class HttpValidations extends GMFDashboardTest {
    @Test
    public void validateHttpPageValues() {
        // Set up data
        int requestsHttpRequests;
        int requestsHttpSuccess;
        int requestsHttpsRequests;
        int requestsHttpsSuccess;

        int responseStatusCodes2xx;
        int responseStatusCodes200;
        int responseStatusCodes4xx;
        int responseStatusCodes400;
        int responseStatusCodes499;
        int responseStatusCodes5xx;
        int responseStatusCodes500;

        // Open the site
        gmfDashboardSite.openSite(deployment);
        gmfDashboardSite.dashboard().waitForPageToLoad();

        // Navigate to the desired service
        gmfDashboardSite.dashboard().navigateToMainStableServiceEntry(deployment.stableServiceName);
        gmfDashboardSite.instances().waitForPageToLoad();

        // Navigate to the desired instance and verify the Summary page is loaded
        gmfDashboardSite.instances().navigateToInstance(deployment.stableServiceInstanceIndex);
        gmfDashboardSite.summary().waitForPageToLoad();

        // Navigate to the HTTP page
        gmfDashboardSite.summary().navigateToHttp();
        gmfDashboardSite.http().waitForPageToLoad();

        // Verify the Requests values are shown
        Assert.assertTrue(gmfDashboardSite.http().isRequestsHttpRequestsShown());
        Assert.assertTrue(gmfDashboardSite.http().isRequestsHttpSuccessShown());
        Assert.assertTrue(gmfDashboardSite.http().isRequestsHttpsRequestsShown());
        Assert.assertTrue(gmfDashboardSite.http().isRequestsHttpsSuccessShown());
        System.out.println("Requests: All expected values are shown.");

        // Get the Requests values
        requestsHttpRequests = gmfDashboardSite.http().getRequestsHttpRequests();
        requestsHttpSuccess = gmfDashboardSite.http().getRequestsHttpSuccess();
        requestsHttpsRequests = gmfDashboardSite.http().getRequestsHttpsRequests();
        requestsHttpsSuccess = gmfDashboardSite.http().getRequestsHttpsSuccess();

        // Verify that the Requests values make sense
        Assert.assertTrue(requestsHttpRequests >= 0);
        Assert.assertTrue(requestsHttpSuccess >= 0);
        Assert.assertTrue(requestsHttpsRequests >= 0);
        Assert.assertTrue(requestsHttpsSuccess >= 0);
        System.out.println("Requests: Values make sense.");

        // Display the Requests values
        System.out.println(String.format("Requests HTTP Requests: %d", requestsHttpRequests));
        System.out.println(String.format("Requests HTTP Success: %d", requestsHttpSuccess));
        System.out.println(String.format("Requests HTTPS Requests: %d", requestsHttpsRequests));
        System.out.println(String.format("Requests HTTPS Success: %d", requestsHttpsSuccess));

        // Verify the Response Status Codes values are shown
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes2xxShown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes200Shown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes4xxShown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes400Shown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes499Shown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes5xxShown());
        Assert.assertTrue(gmfDashboardSite.http().isResponseStatusCodes500Shown());
        System.out.println("Response Status Codes: All expected values are shown.");

        // Get the Response Status Codes values
        responseStatusCodes2xx = gmfDashboardSite.http().getResponseStatusCodes2xx();
        responseStatusCodes200 = gmfDashboardSite.http().getResponseStatusCodes200();
        responseStatusCodes4xx = gmfDashboardSite.http().getResponseStatusCodes4xx();
        responseStatusCodes400 = gmfDashboardSite.http().getResponseStatusCodes400();
        responseStatusCodes499 = gmfDashboardSite.http().getResponseStatusCodes499();
        responseStatusCodes5xx = gmfDashboardSite.http().getResponseStatusCodes5xx();
        responseStatusCodes500 = gmfDashboardSite.http().getResponseStatusCodes500();

        // Verify that the Response Status Codes values make sense
        Assert.assertTrue(responseStatusCodes2xx >= 0);
        Assert.assertTrue(responseStatusCodes200 >= 0);
        Assert.assertTrue(responseStatusCodes4xx >= 0);
        Assert.assertTrue(responseStatusCodes400 >= 0);
        Assert.assertTrue(responseStatusCodes499 >= 0);
        Assert.assertTrue(responseStatusCodes5xx >= 0);
        Assert.assertTrue(responseStatusCodes500 >= 0);
        System.out.println("Response Status Codes: Values make sense.");

        // Display the Response Status Codes values
        System.out.println(String.format("Response Status Codes 2XX: %d", responseStatusCodes2xx));
        System.out.println(String.format("Response Status Codes 200: %d", responseStatusCodes200));
        System.out.println(String.format("Response Status Codes 4XX: %d", responseStatusCodes4xx));
        System.out.println(String.format("Response Status Codes 400: %d", responseStatusCodes400));
        System.out.println(String.format("Response Status Codes 499: %d", responseStatusCodes499));
        System.out.println(String.format("Response Status Codes 5XX: %d", responseStatusCodes5xx));
        System.out.println(String.format("Response Status Codes 500: %d", responseStatusCodes500));
    }
}
