package com.blackbox.siteSpecific.tests.api;

import com.blackbox.dataModels.ServiceInstanceModel;
import com.blackbox.dataModels.ServiceList;
import com.blackbox.dataModels.ServiceModel;
import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.DiscoveryService;
import org.junit.Assert;
import org.junit.Test;

public class DiscoveryServicesTests extends ApiTest {
    private ServiceList services;
    private final String serviceName = "Discovery Service";
    private final int serviceInstanceIndex = 0;

    private final String NONEXISTENT_SERVICE_NAME = "Bananagrams";
    private final String NONEXISTENT_SERVICE_VERSION = "0.0.0";
    private final String NONEXISTENT_SERVICE_INSTANCE = "abcdefghijklmnopqrstuvwxyz0123456789";

    @Test
    public void happyPaths() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);
        ServiceModel service;
        int servicesCount = 0;
        int authorizedServicesCount = 0;
        int authorizedMeteredServicesCount = 0;
        int authorizedThreadedServicesCount = 0;

        // Get the list of available services
        discoveryService.getServices();

        // Make sure at least one service is present
        Assert.assertTrue(discoveryService.getServiceCount() > 0);

        // Validate the format of the /services response
        Assert.assertTrue(discoveryService.isServicesResponseFormatValid());

        // Model the services from the response
        services = discoveryService.modelServices();

        // Iterate through the available services, checking the /metrics and /threads endpoints when available and authorized
        for(int index = 0; index < services.size(); index++) {
            servicesCount++;

            // Get the current service so we don't have to keep making ad-hoc objects
            service = new ServiceModel(services.get(index));

            // Make sure we are authorized to hit the service's endpoints
            if(service.isAuthorized()) {
                authorizedServicesCount++;

                // Loop through the service's instances
                for(ServiceInstanceModel serviceInstance: service.getInstances()) {
                    // Hit the /metrics endpoint if it should generate a valid response
                    if (service.isMetered()) {
                        authorizedMeteredServicesCount++;
                        discoveryService.getMetrics(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                    }

                    // Hit the /threads endpoint if it should generate a valid response
                    if (service.isThreaded()) {
                        authorizedThreadedServicesCount++;
                        discoveryService.getThreads(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                    }
                }
            }
        }

        // Make sure we performed the tests we wanted to perform
        if(authorizedServicesCount == 0) {
            System.out.println("WARNING: No authorized services were found.");
        }

        if(authorizedMeteredServicesCount == 0) {
            System.out.println("WARNING: No authorized metered services were found.");
        }

        if(authorizedThreadedServicesCount == 0) {
            System.out.println("WARNING: No authorized metered services were found.");
        }

        // Display some stats
        System.out.println("Tests performed against the following data:");
        System.out.println(String.format("    Total Services: %d", servicesCount));
        System.out.println(String.format("    Authorized Services: %d", authorizedServicesCount));
        System.out.println(String.format("    Authorized Metered Services: %d", authorizedMeteredServicesCount));
        System.out.println(String.format("    Authorized Threaded Services: %d", authorizedThreadedServicesCount));
    }


    @Test
    public void negativeTests() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);
        ServiceModel service;

        // Get and model the services if they have not already been modeled
        if(services == null) {
            discoveryService.getServices();
            Assert.assertTrue(discoveryService.getServiceCount() > 0);
            services = discoveryService.modelServices();
        }

        // Iterate through the available services, verifying that non-authorized /metrics and /threads endpoints fail as expected
        for(int index = 0; index < services.size(); index++) {
            // Get the current service so we don't have to keep making ad-hoc objects
            service = new ServiceModel(services.get(index));

            // Make sure we are authorized to hit the service's endpoints
            if(!service.isAuthorized()) {
                System.out.println(String.format("Service %s is not authorized, checking endpoints for expected failure.", service.getName()));

                // Loop through the service's instances
                for(ServiceInstanceModel serviceInstance: service.getInstances()) {
                    // Verify hitting the /metrics endpoint fails
                    discoveryService.getMetricsExpectFailure(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                    Assert.assertFalse(discoveryService.didLastRequestSucceed());

                    // Verify hitting the /threads endpoint fails
                    discoveryService.getThreadsExpectFailure(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                    Assert.assertFalse(discoveryService.didLastRequestSucceed());
                }
            } else {
                // Check if the service is metered and hit the /metrics endpoint if it is not
                if(!service.isMetered()) {
                    System.out.println(String.format("Service %s is authorized but not metered, checking /metrics endpoints for expected failure.", service.getName()));

                    // Loop through the service's instances
                    for(ServiceInstanceModel serviceInstance: service.getInstances()) {
                        // Verify hitting the /metrics endpoint fails
                        discoveryService.getMetricsExpectFailure(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                        Assert.assertFalse(discoveryService.didLastRequestSucceed());
                    }
                }

                // Check if the service is threaded and hit the /threads endpoint if it is not
                if(!service.isThreaded()) {
                    System.out.println(String.format("Service %s is authorized but not threaded, checking /threads endpoints for expected failure.", service.getName()));

                    // Loop through the service's instances
                    for(ServiceInstanceModel serviceInstance: service.getInstances()) {
                        // Verify hitting the /threads endpoint fails
                        discoveryService.getThreadsExpectFailure(service.getUrlName(), service.getVersion(), serviceInstance.getName());
                        Assert.assertFalse(discoveryService.didLastRequestSucceed());
                    }
                }
            }
        }

        // Hit an invalid endpoint based on the /services endpoint and verify the call fails
        discoveryService.getUrlExpectFailure(discoveryService.getServicesUrl(), services.get(serviceName).getUrlName());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /metrics endpoint with parameters for a nonexistent service and verify the call fails
        discoveryService.getMetricsExpectFailure(NONEXISTENT_SERVICE_NAME, NONEXISTENT_SERVICE_VERSION, NONEXISTENT_SERVICE_INSTANCE);
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /metrics endpoint without parameters and verify the call fails
        discoveryService.getUrlExpectFailure(discoveryService.getMetricsUrl());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /metrics endpoint with empty parameters and verify the call fails
        discoveryService.getMetricsExpectFailure("", "", "");
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /threads endpoint with parameters for a nonexistent service and verify the call fails
        discoveryService.getThreadsExpectFailure(NONEXISTENT_SERVICE_NAME, NONEXISTENT_SERVICE_VERSION, NONEXISTENT_SERVICE_INSTANCE);
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /threads endpoint without parameters and verify the call fails
        discoveryService.getUrlExpectFailure(discoveryService.getThreadsUrl());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /threads endpoint with empty parameters and verify the call fails
        discoveryService.getThreadsExpectFailure("", "", "");
        Assert.assertFalse(discoveryService.didLastRequestSucceed());
    }
}
