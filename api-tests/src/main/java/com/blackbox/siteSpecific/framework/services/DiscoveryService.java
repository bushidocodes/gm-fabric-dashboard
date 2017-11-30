package com.blackbox.siteSpecific.framework.services;

import com.blackbox.common.api.RestService;
import com.blackbox.common.helpers.KeystoreModel;
import com.blackbox.dataModels.JsonElementStructure;
import com.blackbox.dataModels.ServiceInstanceModel;
import com.blackbox.dataModels.ServiceList;
import com.blackbox.dataModels.ServiceModel;
import com.blackbox.siteSpecific.framework.base.SiteDeployment;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class DiscoveryService extends RestService {
    private String baseUrl;
    private final String SERVICES_ENDPOINT = "/services";
    private String servicesUrl;
    private final String METRICS_ENDPOINT = "/metrics";
    private String metricsUrl;
    private final String THREADS_ENDPOINT = "/threads";
    private String threadsUrl;

    JsonElementStructure[] servicesResponseStructure;
    JsonElementStructure[] servicesInstancesResponseStructure;

    public static final String SERVICES_RESPONSE_NAME_KEY = "name";
    public static final String SERVICES_RESPONSE_VERSION_KEY = "version";
    public static final String SERVICES_RESPONSE_OWNER_KEY = "owner";
    public static final String SERVICES_RESPONSE_CAPABILITY_KEY = "capability";
    public static final String SERVICES_RESPONSE_MINIMUM_KEY = "minimum";
    public static final String SERVICES_RESPONSE_MAXIMUM_KEY = "maximum";
    public static final String SERVICES_RESPONSE_DOCUMENTATION_KEY = "documentation";
    public static final String SERVICES_RESPONSE_AUTHORIZED_KEY = "authorized";
    public static final String SERVICES_RESPONSE_METERED_KEY = "metered";
    public static final String SERVICES_RESPONSE_THREADED_KEY = "threaded";
    public static final String SERVICES_RESPONSE_RUNTIME_KEY = "runtime";
    public static final String SERVICES_RESPONSE_INSTANCES_KEY = "instances";
    public static final String SERVICES_RESPONSE_INSTANCES_NAME_KEY = "name";
    public static final String SERVICES_RESPONSE_INSTANCES_START_TIME_KEY = "start_time";


    // <editor-fold desc="Constructor">

    public DiscoveryService(SiteDeployment deployment, KeystoreModel truststore, KeystoreModel keystore) {
        super(truststore, keystore);

        baseUrl = deployment.discoveryServiceUrl;
        servicesUrl = baseUrl + SERVICES_ENDPOINT;
        metricsUrl = baseUrl + METRICS_ENDPOINT;
        threadsUrl = baseUrl + THREADS_ENDPOINT;

        servicesResponseStructure = new JsonElementStructure[]{
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_NAME_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_VERSION_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_OWNER_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_CAPABILITY_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_MINIMUM_KEY).setType(int.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_MAXIMUM_KEY).setType(int.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_DOCUMENTATION_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_AUTHORIZED_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_METERED_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_THREADED_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_RUNTIME_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_INSTANCES_KEY).setType(JsonArray.class).build()
        };
        servicesInstancesResponseStructure = new JsonElementStructure[]{
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_INSTANCES_NAME_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(SERVICES_RESPONSE_INSTANCES_START_TIME_KEY).setType(double.class).build()
        };
    }

    // </editor-fold>


    // <editor-fold desc="Get URLs">

    public String getServicesUrl() {
        return servicesUrl;
    }

    public String getMetricsUrl() {
        return metricsUrl;
    }

    public String getThreadsUrl() {
        return threadsUrl;
    }

    // </editor-fold>


    // <editor-fold desc="Make REST Calls">

    public void getServices() {
        getUrl(servicesUrl);
    }

    public void getServicesExpectFailure() {
        getUrlExpectFailure(servicesUrl);
    }

    public void getMetrics(String service, String version, String instance) {
        getUrl(metricsUrl, new String[]{service, version, instance});
    }

    public void getMetricsExpectFailure(String service, String version, String instance) {
        getUrlExpectFailure(metricsUrl, new String[]{service, version, instance});
    }

    public void getThreads(String service, String version, String instance) {
        getUrl(threadsUrl, new String[]{service, version, instance});
    }

    public void getThreadsExpectFailure(String service, String version, String instance) {
        getUrlExpectFailure(threadsUrl, new String[]{service, version, instance});
    }

    // </editor-fold>


    // <editor-fold desc="Validate Response Format">

    public boolean isServicesResponseFormatValid(JsonObject jsonObject) {
        String throwawayString;
        int throwawayInt;
        boolean throwawayBoolean;
        double throwawayDouble;
        JsonArray instancesJsonArray;

        for(JsonElementStructure jsonElementStructure: servicesResponseStructure) {
            if(jsonElementStructure.getType() == String.class) {
                throwawayString = jsonObject.get(jsonElementStructure.getKey()).getAsString();
            } else if(jsonElementStructure.getType() == int.class) {
                throwawayInt = jsonObject.get(jsonElementStructure.getKey()).getAsInt();
            } else if(jsonElementStructure.getType() == boolean.class) {
                throwawayBoolean = jsonObject.get(jsonElementStructure.getKey()).getAsBoolean();
            } else if(jsonElementStructure.getType() == JsonArray.class) {
                instancesJsonArray = jsonObject.get(jsonElementStructure.getKey()).getAsJsonArray();

                for(int index = 0; index < instancesJsonArray.size(); index++) {
                    for(JsonElementStructure instanceElementStructure: servicesInstancesResponseStructure) {
                        if(instanceElementStructure.isOfType(String.class)) {
                            throwawayString = instancesJsonArray.get(index).getAsJsonObject().get(instanceElementStructure.getKey()).getAsString();
                        } else if(instanceElementStructure.isOfType(double.class)) {
                            throwawayDouble = instancesJsonArray.get(index).getAsJsonObject().get(instanceElementStructure.getKey()).getAsDouble();
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


    // <editor-fold desc="Parse Data from Response">

    public int getServiceCount() {
        if(response == null) {
            throw new RuntimeException("Response is empty, a call may not have been made yet.");
        } else {
            if(response.isJsonObject()) {
                return 1;
            } else if(response.isJsonArray()) {
                return response.getAsJsonArray().size();
            } else {
                throw new RuntimeException(String.format("Response was not an object of %s or %s as expected.",
                        JsonObject.class,
                        JsonArray.class));
            }
        }
    }
    
    private ServiceModel modelService(JsonObject jsonObject) {
        JsonArray instances;
        JsonObject currentInstance;

        ServiceModel serviceModel = new ServiceModel.ServiceModelBuilder()
                .setName(jsonObject.get(SERVICES_RESPONSE_NAME_KEY).getAsString())
                .setVersion(jsonObject.get(SERVICES_RESPONSE_VERSION_KEY).getAsString())
                .setOwner(jsonObject.get(SERVICES_RESPONSE_OWNER_KEY).getAsString())
                .setCapability(jsonObject.get(SERVICES_RESPONSE_CAPABILITY_KEY).getAsString())
                .setMinimum(jsonObject.get(SERVICES_RESPONSE_MINIMUM_KEY).getAsInt())
                .setMaximum(jsonObject.get(SERVICES_RESPONSE_MAXIMUM_KEY).getAsInt())
                .setDocumentation(jsonObject.get(SERVICES_RESPONSE_DOCUMENTATION_KEY).getAsString())
                .setAuthorized(jsonObject.get(SERVICES_RESPONSE_AUTHORIZED_KEY).getAsBoolean())
                .setMetered(jsonObject.get(SERVICES_RESPONSE_METERED_KEY).getAsBoolean())
                .setThreaded(jsonObject.get(SERVICES_RESPONSE_THREADED_KEY).getAsBoolean())
                .setRuntime(jsonObject.get(SERVICES_RESPONSE_RUNTIME_KEY).getAsString())
                .build();

        instances = jsonObject.get(SERVICES_RESPONSE_INSTANCES_KEY).getAsJsonArray();
        for(int instanceIndex = 0; instanceIndex < instances.size(); instanceIndex++) {
            currentInstance = instances.get(instanceIndex).getAsJsonObject();
            serviceModel.addInstance(new ServiceInstanceModel.ServiceInstanceModelBuilder()
                    .setName(currentInstance.get(SERVICES_RESPONSE_INSTANCES_NAME_KEY).getAsString())
                    .setStartTime(currentInstance.get(SERVICES_RESPONSE_INSTANCES_START_TIME_KEY).getAsDouble())
                    .build());
        }

        return serviceModel;
    }

    public ServiceList modelServices() {
        ServiceList services = new ServiceList();

        if(response == null) {
            throw new RuntimeException("Response is empty, a call may not have been made yet.");
        } else {
            if(response.isJsonObject()) {
                services.add(modelService(response.getAsJsonObject()));
            } else if(response.isJsonArray()) {
                for(int index = 0; index < response.getAsJsonArray().size(); index++) {
                    services.add(modelService(response.getAsJsonArray().get(index).getAsJsonObject()));
                }
            } else {
                throw new RuntimeException(String.format("Response was not an object of %s or %s as expected.",
                        JsonObject.class,
                        JsonArray.class));
            }
        }

        return services;
    }

    // </editor-fold>
}
