package com.blackbox.siteSpecific.framework.services;

import com.blackbox.common.api.RestUtil;
import com.blackbox.siteSpecific.framework.base.SiteDeployment;
import com.google.gson.JsonElement;

public class DiscoveryService {
    private static final String URL_SEPARATOR = "/";
    private String baseUrl;
    private final String SERVICES_ENDPOINT = "/services";
    private String servicesUrl;
    private final String METRICS_ENDPOINT = "/metrics";
    private String metricsUrl;
    private final String THREADS_ENDPOINT = "/threads";
    private String threadsUrl;
    private RestUtil restUtil;

    public DiscoveryService(SiteDeployment deployment) {
        restUtil = new RestUtil();

        baseUrl = deployment.discoveryServiceUrl;
        servicesUrl = baseUrl + SERVICES_ENDPOINT;
        metricsUrl = baseUrl + METRICS_ENDPOINT;
        threadsUrl = baseUrl + THREADS_ENDPOINT;
    }

    public JsonElement getServices() {
        return restUtil.get(servicesUrl);
    }

    private String buildUrlFromParameters(String baseUrl, String[] parameters) {
        String concatenatedUrl = baseUrl;

        for(String parameter: parameters) {
            concatenatedUrl = concatenatedUrl + URL_SEPARATOR + parameter;
        }

        return concatenatedUrl;
    }

    public JsonElement getMetrics(String service, String version, String instance) {
        return restUtil.get(buildUrlFromParameters(metricsUrl, new String[]{service, version, instance}));
    }

    public JsonElement getThreads(String service, String version, String instance) {
        return restUtil.get(buildUrlFromParameters(threadsUrl, new String[]{service, version, instance}));
    }
}
