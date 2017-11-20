package com.blackbox.siteSpecific.framework.services;

import com.blackbox.common.api.RestUtil;
import com.blackbox.dataModels.JsonElementStructure;
import com.blackbox.dataModels.ServiceInstance;
import com.blackbox.siteSpecific.framework.base.SiteDeployment;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

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
    private JsonElement response;

    JsonElementStructure[] servicesResponseStructure;
    JsonElementStructure[] servicesInstancesResponseStructure;


    // <editor-fold desc="Constructor">

    public DiscoveryService(SiteDeployment deployment) {
        restUtil = new RestUtil();

        baseUrl = deployment.discoveryServiceUrl;
        servicesUrl = baseUrl + SERVICES_ENDPOINT;
        metricsUrl = baseUrl + METRICS_ENDPOINT;
        threadsUrl = baseUrl + THREADS_ENDPOINT;

        servicesResponseStructure = new JsonElementStructure[]{
                new JsonElementStructure.JsonElementFormatBuilder().setName("name").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("version").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("owner").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("capability").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("minimum").setType(int.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("maximum").setType(int.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("documentation").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("authorized").setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("metered").setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("threaded").setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("runtime").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("instances").setType(JsonArray.class).build()
        };
        servicesInstancesResponseStructure = new JsonElementStructure[]{
                new JsonElementStructure.JsonElementFormatBuilder().setName("name").setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName("start_time").setType(int.class).build()
        };
    }

    // </editor-fold>


    // <editor-fold desc="Build Parameterized URL">

    private String buildUrlFromParameters(String baseUrl, String[] parameters) {
        String concatenatedUrl = baseUrl;

        for(String parameter: parameters) {
            concatenatedUrl = concatenatedUrl + URL_SEPARATOR + parameter;
        }

        return concatenatedUrl;
    }

    // </editor-fold>


    // <editor-fold desc="Make REST Calls">

    public void getServices() {
        response = restUtil.get(servicesUrl);
    }

    public void getMetrics(String service, String version, String instance) {
        response = restUtil.get(buildUrlFromParameters(metricsUrl, new String[]{service, version, instance}));
    }

    public void getMetrics(ServiceInstance serviceInstance) {
        getMetrics(serviceInstance.getService(), serviceInstance.getVersion(), serviceInstance.getInstance());
    }

    public void getThreads(String service, String version, String instance) {
        response = restUtil.get(buildUrlFromParameters(threadsUrl, new String[]{service, version, instance}));
    }

    public void getThreads(ServiceInstance serviceInstance) {
        getThreads(serviceInstance.getService(), serviceInstance.getVersion(), serviceInstance.getInstance());
    }

    // </editor-fold>


    // <editor-fold desc="Get Response">

    public JsonElement getResponse() {
        return response;
    }

    // </editor-fold>


    // <editor-fold desc="Validate Response Format">

    public boolean isServicesResponseFormatValid(JsonObject jsonData) {
        String throwawayString;
        int throwawayInt;
        boolean throwawayBoolean;
        JsonArray instancesJsonArray;

        for(JsonElementStructure jsonElementStructure: servicesResponseStructure) {
            if(jsonElementStructure.getType() == String.class) {
                throwawayString = jsonData.get(jsonElementStructure.getKey()).getAsString();
            } else if(jsonElementStructure.getType() == int.class) {
                throwawayInt = jsonData.get(jsonElementStructure.getKey()).getAsInt();
            } else if(jsonElementStructure.getType() == boolean.class) {
                throwawayBoolean = jsonData.get(jsonElementStructure.getKey()).getAsBoolean();
            } else if(jsonElementStructure.getType() == JsonArray.class) {
                instancesJsonArray = jsonData.get(jsonElementStructure.getKey()).getAsJsonArray();

                for(int index = 0; index < instancesJsonArray.size(); index++) {
                    for(JsonElementStructure instanceElementStructure: servicesInstancesResponseStructure) {
                        if(instanceElementStructure.isOfType(String.class)) {
                            throwawayString = instancesJsonArray.get(index).getAsJsonObject().get(instanceElementStructure.getKey()).getAsString();
                        } else if(instanceElementStructure.isOfType(int.class)) {
                            throwawayInt = instancesJsonArray.get(index).getAsJsonObject().get(instanceElementStructure.getKey()).getAsInt();
                        } else {
                            throw new RuntimeException(String.format("Instances member \"%s\" has unexpected type %s",
                                    instanceElementStructure.getKey(),
                                    instanceElementStructure.getType()));
                        }
                    }
                }
            } else {
                throw new RuntimeException(String.format("Member \"%s\" has unexpected type %s",
                        jsonElementStructure.getKey(),
                        jsonElementStructure.getType()));
            }
        }

        return true;
    }

    public boolean isServicesResponseFormatValid() {
        if(response.isJsonObject()) {
            return isServicesResponseFormatValid(response.getAsJsonObject());
        } else if(response.isJsonArray()) {
            for(int index = 0; index < response.getAsJsonArray().size(); index++) {
                if(!isServicesResponseFormatValid(response.getAsJsonArray().get(index).getAsJsonObject())) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    // </editor-fold>
}
