package com.blackbox.siteSpecific.framework.services;

import com.blackbox.common.api.RestService;
import com.blackbox.dataModels.JsonElementStructure;
import com.blackbox.siteSpecific.framework.base.SiteDeployment;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class FinderService extends RestService {
    enum FinderServiceEndpoint {
        NONE,
        DATA_SOURCES,
        DATA_SOURCES_INTERNAL,
        DATA_SOURCES_CATEGORIES
    }

    private String baseUrl;

    private final String DATA_SOURCES_ENDPOINT = "/data/sources";  // GET, /data/sources, /data/sources/(sourceId)
    private String dataSourcesUrl;
    private final String DATA_SOURCES_INTERNAL_ENDPOINT = "/data/sources/internal";  // GET
    private String dataSourcesInternalUrl;
    private final String DATA_SOURCES_CATEGORIES_ENDPOINT = "/data/sources/categories";  // GET, /data/sources/categories, /data/sources/categories/(categoryId)
    private String dataSourcesCategoriesUrl;

    private FinderServiceEndpoint lastRequestEndpoint;

    private final String INCLUDE_TEMPLATE_ARGUMENT = "includeTemplate";

    JsonElementStructure[] dataSourcesResponseStructure;

    public static final String DATA_SOURCES_RESPONSE_ID_KEY = "id";
    public static final String DATA_SOURCES_RESPONSE_DISPLAY_NAME_KEY = "displayName";
    public static final String DATA_SOURCES_RESPONSE_DESCRIPTION_KEY = "description";
    public static final String DATA_SOURCES_RESPONSE_URL_TEMPLATE_KEY = "urlTemplate";
    public static final String DATA_SOURCES_RESPONSE_EXPORTABLE_KEY = "exportable";
    public static final String DATA_SOURCES_RESPONSE_ADVANCED_ENABLED_KEY = "advancedEnabled";
    public static final String DATA_SOURCES_RESPONSE_INTERNAL_KEY = "internal";
    public static final String DATA_SOURCES_RESPONSE_BEDROCK_PARTNER_KEY = "bedrockPartner";
    public static final String DATA_SOURCES_RESPONSE_TYPE_KEY = "type";
    public static final String DATA_SOURCES_RESPONSE_ENTITY_TYPES_KEY = "entityTypes";
    public static final String DATA_SOURCES_RESPONSE_APPLICATION_KEY = "application";
    public static final String DATA_SOURCES_RESPONSE_TOOLTIP_KEY = "tooltip";
    public static final String DATA_SOURCES_RESPONSE_STYLE_KEY = "style";
    public static final String DATA_SOURCES_RESPONSE_QUERY_TEMPLATE_KEY = "queryTemplate";
    public static final String DATA_SOURCES_RESPONSE_CARD_TEMPLATE_KEY = "cardTemplate";
    public static final String DATA_SOURCES_RESPONSE_CSV_EXPORTS_KEY = "csvExports";
    public static final String DATA_SOURCES_RESPONSE_PAGINATION_KEY = "pagination";
    public static final String DATA_SOURCES_RESPONSE_FACETS_KEY = "facets";


    // <editor-fold desc="Constructor">

    public FinderService(SiteDeployment deployment) {
        super();

        baseUrl = deployment.finderServiceUrl;
        dataSourcesUrl = baseUrl + DATA_SOURCES_ENDPOINT;
        dataSourcesInternalUrl = baseUrl + DATA_SOURCES_INTERNAL_ENDPOINT;
        dataSourcesCategoriesUrl = baseUrl + DATA_SOURCES_CATEGORIES_ENDPOINT;

        lastRequestEndpoint = FinderServiceEndpoint.NONE;

        dataSourcesResponseStructure = new JsonElementStructure[]{
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_ID_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_DISPLAY_NAME_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_DESCRIPTION_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_URL_TEMPLATE_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_EXPORTABLE_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_ADVANCED_ENABLED_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_INTERNAL_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_BEDROCK_PARTNER_KEY).setType(boolean.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_TYPE_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_ENTITY_TYPES_KEY).setType(JsonArray.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_APPLICATION_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_TOOLTIP_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_STYLE_KEY).setType(JsonObject.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_QUERY_TEMPLATE_KEY).setType(JsonObject.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_CARD_TEMPLATE_KEY).setType(JsonObject.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_CSV_EXPORTS_KEY).setType(JsonObject.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_PAGINATION_KEY).setType(String.class).build(),
                new JsonElementStructure.JsonElementFormatBuilder().setName(DATA_SOURCES_RESPONSE_FACETS_KEY).setType(JsonArray.class).build()
        };
    }

    // </editor-fold>


    // <editor-fold desc="Get URLs">

    public String getDataSourcesUrl() {
        return dataSourcesUrl;
    }

    public String getDataSourcesInternalUrl() {
        return dataSourcesInternalUrl;
    }

    // </editor-fold>


    // <editor-fold desc="/data/sources REST Calls">

    public void getDataSources(boolean includeTemplate) {
        getUrl(dataSourcesUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSources() {
        // Note: This is equivalent to calling getDataSources(true) since the default value for 'includeTemplate' is true
        getUrl(dataSourcesUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSourcesExpectFailure(boolean includeTemplate) {
        getUrlExpectFailure(dataSourcesUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSourcesExpectFailure() {
        // Note: This is equivalent to calling getDataSourcesExpectFailure(true) since the default value for 'includeTemplate' is true
        getUrlExpectFailure(dataSourcesUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSources(String source, boolean includeTemplate) {
        getUrl(dataSourcesUrl, source, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSources(String source) {
        // Note: This is equivalent to calling getDataSources(source, true) since the default value for 'includeTemplate' is true
        getUrl(dataSourcesUrl, source, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSourcesExpectFailure(String sourceId, boolean includeTemplate) {
        getUrlExpectFailure(dataSourcesUrl, sourceId, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    public void getDataSourcesExpectFailure(String source) {
        // Note: This is equivalent to calling getDataSourcesExpectFailure(source, true) since the default value for 'includeTemplate' is true
        getUrlExpectFailure(dataSourcesUrl, source, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES;
    }

    // </editor-fold>


    // <editor-fold desc="/data/sources/internal REST Calls>

    public void getDataSourcesInternal(boolean includeTemplate) {
        getUrl(dataSourcesInternalUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_INTERNAL;
    }

    public void getDataSourcesInternal() {
        // Note: This is equivalent to calling getDataSourcesInternal(true) since the default value for 'includeTemplate' is true
        getUrl(dataSourcesInternalUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_INTERNAL;
    }

    public void getDataSourcesInternalExpectFailure(boolean includeTemplate) {
        getUrlExpectFailure(dataSourcesInternalUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_INTERNAL;
    }

    public void getDataSourcesInternalExpectFailure() {
        // Note: This is equivalent to calling getDataSourcesInternalExpectFailure(true) since the default value for 'includeTemplate' is true
        getUrlExpectFailure(dataSourcesInternalUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_INTERNAL;
    }

    // </editor-fold>


    // <editor-fold desc="/data/sources/categories REST Calls">

    public void getDataSourcesCategories(boolean includeTemplate) {
        getUrl(dataSourcesCategoriesUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategories() {
        // Note: This is equivalent to calling getDataSourcesCategories(true) since the default value for 'includeTemplate' is true
        getUrl(dataSourcesCategoriesUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategoriesExpectFailure(boolean includeTemplate) {
        getUrlExpectFailure(dataSourcesCategoriesUrl, EMPTY_PARAMETERS, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategoriesExpectFailure() {
        // Note: This is equivalent to calling getDataSourcesCategoriesExpectFailure(true) since the default value for 'includeTemplate' is true
        getUrlExpectFailure(dataSourcesCategoriesUrl, EMPTY_PARAMETERS, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategories(String category, boolean includeTemplate) {
        getUrl(dataSourcesCategoriesUrl, category, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategories(String category) {
        // Note: This is equivalent to calling getDataSourcesCategories(category, true) since the default value for 'includeTemplate' is true
        getUrl(dataSourcesCategoriesUrl, category, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategoriesExpectFailure(String category, boolean includeTemplate) {
        getUrlExpectFailure(dataSourcesCategoriesUrl, category, (INCLUDE_TEMPLATE_ARGUMENT + includeTemplate));
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    public void getDataSourcesCategoriesExpectFailure(String category) {
        // Note: This is equivalent to calling getDataSourcesCategoriesExpectFailure(category, true) since the default value for 'includeTemplate' is true
        getUrlExpectFailure(dataSourcesCategoriesUrl, category, EMPTY_ARGUMENTS);
        lastRequestEndpoint = FinderServiceEndpoint.DATA_SOURCES_CATEGORIES;
    }

    // </editor-fold>


    // <editor-fold desc="Validate Response Format">

    private boolean isDataSourcesResponseFormatValid(JsonObject jsonObject) {
        String throwawayString;
        boolean throwawayBoolean;
        JsonObject throwawayJsonObject;
        JsonArray throwawayJsonArray;

        for(JsonElementStructure jsonElementStructure: dataSourcesResponseStructure) {
            if(jsonElementStructure.getType() == String.class) {
                System.out.println(String.format("Looking for key \"%s\" with a String value", jsonElementStructure.getKey()));  // DEBUG
                System.out.println(jsonObject);  // DEBUG
                throwawayString = jsonObject.get(jsonElementStructure.getKey()).getAsString();
            } else if(jsonElementStructure.getType() == boolean.class) {
                throwawayBoolean = jsonObject.get(jsonElementStructure.getKey()).getAsBoolean();
            } else if(jsonElementStructure.getType() == JsonObject.class) {
                throwawayJsonObject = jsonObject.get(jsonElementStructure.getKey()).getAsJsonObject();
            } else if(jsonElementStructure.getType() == JsonArray.class) {
                throwawayJsonArray = jsonObject.get(jsonElementStructure.getKey()).getAsJsonArray();
            } else {
                throw new RuntimeException(String.format("Member \"%s\" has unexpected type %s",
                        jsonElementStructure.getKey(),
                        jsonElementStructure.getType()));
            }
        }

        return true;
    }

    public boolean isDataSourcesResponseFormatValid() {
        if(response.isJsonObject()) {
            return isDataSourcesResponseFormatValid(response.getAsJsonObject());
        } else if(response.isJsonArray()) {
            for(int index = 0; index < response.getAsJsonArray().size(); index++) {
                if(!isDataSourcesResponseFormatValid(response.getAsJsonArray().get(index).getAsJsonObject())) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    // </editor-fold>


    // <editor-fold desc="Get Most Recent Call Endpoint">

    public FinderServiceEndpoint getLastRequestEndpoint() {
        return lastRequestEndpoint;
    }

    // </editor-fold>


    // <editor-fold desc="Parse Data from Response">

//    public int getServiceCount() {
//        if(response == null) {
//            throw new RuntimeException("Response is empty, a call may not have been made yet.");
//        } else {
//            if(response.isJsonObject()) {
//                return 1;
//            } else if(response.isJsonArray()) {
//                return response.getAsJsonArray().size();
//            } else {
//                throw new RuntimeException(String.format("Response was not an object of %s or %s as expected.",
//                        JsonObject.class,
//                        JsonArray.class));
//            }
//        }
//    }
    
//    private ServiceModel modelService(JsonObject jsonObject) {
//        JsonArray instances;
//        JsonObject currentInstance;
//
//        ServiceModel serviceModel = new ServiceModel.ServiceModelBuilder()
//                .setName(jsonObject.get(SERVICES_RESPONSE_NAME_KEY).getAsString())
//                .setVersion(jsonObject.get(SERVICES_RESPONSE_VERSION_KEY).getAsString())
//                .setOwner(jsonObject.get(SERVICES_RESPONSE_OWNER_KEY).getAsString())
//                .setCapability(jsonObject.get(SERVICES_RESPONSE_CAPABILITY_KEY).getAsString())
//                .setMinimum(jsonObject.get(SERVICES_RESPONSE_MINIMUM_KEY).getAsInt())
//                .setMaximum(jsonObject.get(SERVICES_RESPONSE_MAXIMUM_KEY).getAsInt())
//                .setDocumentation(jsonObject.get(SERVICES_RESPONSE_DOCUMENTATION_KEY).getAsString())
//                .setAuthorized(jsonObject.get(SERVICES_RESPONSE_AUTHORIZED_KEY).getAsBoolean())
//                .setMetered(jsonObject.get(SERVICES_RESPONSE_METERED_KEY).getAsBoolean())
//                .setThreaded(jsonObject.get(SERVICES_RESPONSE_THREADED_KEY).getAsBoolean())
//                .setRuntime(jsonObject.get(SERVICES_RESPONSE_RUNTIME_KEY).getAsString())
//                .build();
//
//        instances = jsonObject.get(SERVICES_RESPONSE_INSTANCES_KEY).getAsJsonArray();
//        for(int instanceIndex = 0; instanceIndex < instances.size(); instanceIndex++) {
//            currentInstance = instances.get(instanceIndex).getAsJsonObject();
//            serviceModel.addInstance(new ServiceInstanceModel.ServiceInstanceModelBuilder()
//                    .setName(currentInstance.get(SERVICES_RESPONSE_INSTANCES_NAME_KEY).getAsString())
//                    .setStartTime(currentInstance.get(SERVICES_RESPONSE_INSTANCES_START_TIME_KEY).getAsDouble())
//                    .build());
//        }
//
//        return serviceModel;
//    }

//    public ServiceList modelServices() {
//        ServiceList services = new ServiceList();
//
//        if(response == null) {
//            throw new RuntimeException("Response is empty, a call may not have been made yet.");
//        } else {
//            if(response.isJsonObject()) {
//                services.add(modelService(response.getAsJsonObject()));
//            } else if(response.isJsonArray()) {
//                for(int index = 0; index < response.getAsJsonArray().size(); index++) {
//                    services.add(modelService(response.getAsJsonArray().get(index).getAsJsonObject()));
//                }
//            } else {
//                throw new RuntimeException(String.format("Response was not an object of %s or %s as expected.",
//                        JsonObject.class,
//                        JsonArray.class));
//            }
//        }
//
//        return services;
//    }

    // </editor-fold>
}
