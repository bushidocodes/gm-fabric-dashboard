package com.blackbox.siteSpecific.tests.api;

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

        // Get the list of available services
        discoveryService.getServices();

        // Make sure at least one service is present
        Assert.assertTrue(discoveryService.getServiceCount() > 0);

        // Validate the format of the /services response
        Assert.assertTrue(discoveryService.isServicesResponseFormatValid());

        // Model the services from the response
        services = discoveryService.modelServices();

        // Get metrics for a service
        discoveryService.getMetrics(
                services.get(serviceName).getUrlName(),
                services.get(serviceName).getVersion(),
                services.get(serviceName).getInstance(serviceInstanceIndex).getName()
        );

        // TODO: Validate the format of the /metrics response

        // Get threads for a service
        discoveryService.getThreads(
                services.get(serviceName).getUrlName(),
                services.get(serviceName).getVersion(),
                services.get(serviceName).getInstance(serviceInstanceIndex).getName()
        );

        // TODO: Validate the format of the /threads response
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
