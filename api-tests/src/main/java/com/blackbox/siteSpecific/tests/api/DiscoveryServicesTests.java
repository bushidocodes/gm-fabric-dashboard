package com.blackbox.siteSpecific.tests.api;

import com.blackbox.dataModels.ServiceInstance;
import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.DiscoveryService;
import com.google.gson.JsonElement;
import org.junit.Assert;
import org.junit.Test;

public class DiscoveryServicesTests extends ApiTest {
    @Test
    public void happyPaths() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);
        JsonElement response;
        ServiceInstance serviceInstance;

        // Get the list of available services
        discoveryService.getServices();

        // Validate the format of the JSON response
        Assert.assertTrue(discoveryService.isServicesResponseFormatValid());

        // Get details for the instance of a service

    }
}
