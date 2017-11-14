package com.blackbox.siteSpecific.tests.api;

import com.blackbox.siteSpecific.framework.base.ApiTest;
import com.google.gson.JsonElement;
import org.junit.Test;


public class RestApiTest extends ApiTest {
    @Test
    public void getListOfServices() {
        // Set up objects
        String restUrl = "https://edge.deciphernow.com/services/discovery-service/1.0/services";
        JsonElement restResponse;

        // Make the REST call and gather the response
        restResponse = restUtil.get(restUrl);

        // Display the JSON contents
        System.out.println(restResponse);
    }
}
