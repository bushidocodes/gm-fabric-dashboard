package com.blackbox.siteSpecific.tests.api;

import com.blackbox.dataModels.ServiceInstanceModel;
import com.blackbox.dataModels.ServiceList;
import com.blackbox.dataModels.ServiceModel;
import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.DiscoveryService;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;

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

        // Get the list of available services
        discoveryService.getServices();

        // Make sure at least one service is present
        Assert.assertTrue(discoveryService.getServiceCount() > 0);
        System.out.println(String.format("Found %d services.", discoveryService.getServiceCount()));

        // Validate the format of the /services response
        Assert.assertTrue(discoveryService.isServicesResponseFormatValid());

        // Model the services from the response
        services = discoveryService.modelServices();

        // Iterate through the available services, checking the /metrics and /threads endpoints when available and authorized
        for(int index = 0; index < services.size(); index++) {
            // Get the current service so we don't have to keep making ad-hoc objects
            service = new ServiceModel(services.get(index));

            // Make sure we are authorized to hit the service's endpoints
            if(service.isAuthorized()) {
                System.out.println(String.format("Service %s is authorized, checking endpoints.", service.getName()));

                // Loop through the service's instances
                for(ServiceInstanceModel serviceInstance: service.getInstances()) {
                    // Hit the /metrics endpoint if it should generate a valid response
                    if (service.isMetered()) {
                        System.out.println(String.format("Service %s is metered, getting metrics.", service.getName()));

                        discoveryService.getMetrics(
                                service.getUrlName(),
                                service.getVersion(),
                                serviceInstance.getName()
                        );
                    } else {
                        System.out.println(String.format("Service %s is not metered, no metrics will be checked."));
                    }

                    // Hit the /threads endpoint if it should generate a valid response
                    if (service.isThreaded()) {
                        System.out.println(String.format("Service %s is threaded, getting threads."));

                        discoveryService.getThreads(
                                service.getUrlName(),
                                service.getVersion(),
                                serviceInstance.getName()
                        );
                    } else {
                        System.out.println(String.format("Service %s is not threaded, no threads will be checked."));
                    }
                }
            } else {
                System.out.println(String.format("Service %s is not authorized, no endpoints will be checked.", service.getName()));
            }
        }
    }


    @Test
    public void negativeTests() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);

        // Get and model the services if they have not already been modeled
        if(services == null) {
            discoveryService.getServices();
            Assert.assertTrue(discoveryService.getServiceCount() > 0);
            services = discoveryService.modelServices();
        }

        // Hit an invalid endpoint based on the /services endpoint and verify the call fails
        discoveryService.getUrlExpectFailure(
                discoveryService.getServicesUrl(),
                services.get(serviceName).getUrlName());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /metrics endpoint with parameters for a nonexistent service and verify the call fails
        discoveryService.getUrlExpectFailure(
                discoveryService.getMetricsUrl(),
                new String[]{
                        NONEXISTENT_SERVICE_NAME,
                        NONEXISTENT_SERVICE_VERSION,
                        NONEXISTENT_SERVICE_INSTANCE
                }
        );
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /metrics endpoint without parameters and verify the call fails
        discoveryService.getUrlExpectFailure(discoveryService.getMetricsUrl());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /threads endpoint with parameters for a nonexistent service and verify the call fails
        discoveryService.getUrlExpectFailure(
                discoveryService.getThreadsUrl(),
                new String[]{
                        NONEXISTENT_SERVICE_NAME,
                        NONEXISTENT_SERVICE_VERSION,
                        NONEXISTENT_SERVICE_INSTANCE
                }
        );
        Assert.assertFalse(discoveryService.didLastRequestSucceed());

        // Hit the /threads endpoint without parameters and verify the call fails
        discoveryService.getUrlExpectFailure(discoveryService.getThreadsUrl());
        Assert.assertFalse(discoveryService.didLastRequestSucceed());
    }
}
