package com.blackbox.common.api;

import com.blackbox.common.helpers.KeystoreModel;
import com.google.gson.JsonElement;

public class RestService {
    protected static final String URL_SEPARATOR = "/";
    protected RestUtil restUtil;
    protected JsonElement response;
    protected boolean didLastRequestSucceed;

    public static final String[] EMPTY_PARAMETERS = null;
    public static final String[] EMPTY_ARGUMENTS = null;


    // <editor-fold desc="Constructor">

    public RestService(KeystoreModel truststore, KeystoreModel keystore) {
        restUtil = new RestUtil(truststore, keystore);
        response = null;
        didLastRequestSucceed = false;
    }

    // </editor-fold>


    // <editor-fold desc="Build URLs with Parameters and Arguments">

    private String buildUrlWithParameters(String url, String[] parameters) {
        String concatenatedUrl = url;

        for(String parameter: parameters) {
            concatenatedUrl = concatenatedUrl + URL_SEPARATOR + parameter;
        }

        return concatenatedUrl;
    }

    private String buildUrlWithArguments(String url, String[] arguments) {
        String concatenatedUrl = url + "?";

        for(int index = 0; index < arguments.length; index++) {
            if(index == 0) {
                concatenatedUrl = concatenatedUrl + arguments[index];
            } else {
                concatenatedUrl = concatenatedUrl + "," + arguments[index];
            }
        }

        return concatenatedUrl;
    }

    private String buildUrl(String url, String[] parameters, String[] arguments) {
        String concatenatedUrl = url;

        if((parameters != null) && (parameters.length > 0)) {
            concatenatedUrl = buildUrlWithParameters(url, parameters);
        }

        if((arguments != null) && (arguments.length > 0)) {
            concatenatedUrl = buildUrlWithArguments(url, arguments);
        }

        return concatenatedUrl;
    }

    // </editor-fold>


    // <editor-fold desc="Make REST Calls">

    public void getUrl(String url, String[] parameters, String[] arguments) {
        response = restUtil.get(buildUrl(url, parameters, arguments));
        didLastRequestSucceed = true;
    }

    public void getUrl(String url, String parameter, String argument) {
        getUrl(url, new String[]{parameter}, new String[]{argument});
    }

    public void getUrl(String url, String parameter, String[] arguments) {
        getUrl(url, new String[]{parameter}, arguments);
    }

    public void getUrl(String url, String[] parameters, String argument) {
        getUrl(url, parameters, new String[]{argument});
    }

    public void getUrlExpectFailure(String url, String[] parameters, String[] arguments) {
        try {
            response = restUtil.get(buildUrl(url, parameters, arguments));
            didLastRequestSucceed = true;
        } catch(ApiTestingException e) {
            didLastRequestSucceed = false;
        }
    }

    public void getUrlExpectFailure(String url, String parameter, String argument) {
        getUrlExpectFailure(url, new String[]{parameter}, new String[]{argument});
    }

    public void getUrlExpectFailure(String url, String parameter, String[] arguments) {
        getUrlExpectFailure(url, new String[]{parameter}, arguments);
    }

    public void getUrlExpectFailure(String url, String[] parameters, String argument) {
        getUrlExpectFailure(url, parameters, new String[]{argument});
    }

    // </editor-fold>


    // <editor-fold desc="Get Response">

    public JsonElement getResponse() {
        return response;
    }

    // </editor-fold>


    // <editor-fold desc="Determine Request Success">

    public boolean didLastRequestSucceed() {
        return didLastRequestSucceed;
    }

    // </editor-fold>
}
