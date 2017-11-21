package com.blackbox.common.api;

import com.google.gson.JsonElement;

public class RestService {
    protected static final String URL_SEPARATOR = "/";
    protected RestUtil restUtil;
    protected JsonElement response;
    protected boolean didLastRequestSucceed;


    // <editor-fold desc="Constructor">

    public RestService() {
        restUtil = new RestUtil();
        response = null;
        didLastRequestSucceed = false;
    }

    // </editor-fold>


    // <editor-fold desc="Build URLs with Parameters">

    private String buildUrlWithParameters(String url, String[] parameters) {
        String concatenatedUrl = url;

        for(String parameter: parameters) {
            concatenatedUrl = concatenatedUrl + URL_SEPARATOR + parameter;
        }

        return concatenatedUrl;
    }

    // </editor-fold>


    // <editor-fold desc="Make REST Calls">

    public void getUrl(String url) {
        response = restUtil.get(url);
        didLastRequestSucceed = true;
    }

    public void getUrl(String url, String[] parameters) {
        getUrl(buildUrlWithParameters(url, parameters));
    }

    public void getUrl(String url, String parameter) {
        getUrl(buildUrlWithParameters(url, new String[]{parameter}));
    }

    public void getUrlExpectFailure(String url) {
        try {
            response = restUtil.get(url);
            didLastRequestSucceed = true;
        } catch(ApiTestingException e) {
            didLastRequestSucceed = false;
        }
    }

    public void getUrlExpectFailure(String url, String[] parameters) {
        getUrlExpectFailure(buildUrlWithParameters(url, parameters));
    }

    public void getUrlExpectFailure(String url, String parameter) {
        getUrlExpectFailure(buildUrlWithParameters(url, new String[]{parameter}));
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
