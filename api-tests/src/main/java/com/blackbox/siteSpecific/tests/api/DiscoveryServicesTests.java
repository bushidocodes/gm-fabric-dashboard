package com.blackbox.siteSpecific.tests.api;

import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.blackbox.siteSpecific.framework.services.DiscoveryService;
import com.google.gson.JsonElement;
import org.junit.Test;

import com.blackbox.common.api.Https;

import javax.net.ssl.KeyManager;
import javax.net.ssl.TrustManager;
import java.net.URL;
import java.security.KeyStore;

public class DiscoveryServicesTests extends ApiTest {
    @Test
    public void happyPaths() {
        // Set up objects
        DiscoveryService discoveryService = new DiscoveryService(deployment);
        JsonElement response;

        // Get the list of available services
        response = discoveryService.getServices();
    }
}
