package com.blackbox.siteSpecific.tests.api;

import com.blackbox.dataModels.ServiceModel;
import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.DiscoveryService;
import org.junit.Assert;
import org.junit.Test;
import java.util.ArrayList;

public class DiscoveryServicesTests extends ApiTest {
    @Test
    public void happyPaths() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);
        ArrayList<ServiceModel> services;
        int serviceIndex = 0;
        int serviceInstanceIndex = 0;

        // Get the list of available services
        discoveryService.getServices();

        // Make sure at least one service is present
        Assert.assertTrue(discoveryService.getServiceCount() > 0);

        // Validate the format of the JSON response
        Assert.assertTrue(discoveryService.isServicesResponseFormatValid());

        // Model the services from the response
        services = discoveryService.modelServices();

        // Get metrics for a service
        discoveryService.getMetrics(
                services.get(serviceIndex).getName(),
                services.get(serviceIndex).getVersion(),
                services.get(serviceIndex).getInstances().get(serviceInstanceIndex).getName());
    }
}
