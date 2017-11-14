package com.blackbox.common.api;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.client.urlconnection.HTTPSProperties;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

public class RestUtil {
    private static String responseType = "application/json";
    private Client restClient;
    JsonParser jsonParser;
    WebResource webResource;
    ClientResponse clientResponse;
    KeyStore keyStore;
    SSLContext sslContext;
    TrustManagerFactory trustManagerFactory;

    private static final String KEYSTORE_FILE_PATH = "/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home/jre/lib/security/cacerts";
    private static final String KEYSTORE_PASSWORD = "changeit";


    // <editor-fold desc="Constructor">

    public RestUtil() {
        sslContext = null;

        try {
            keyStore = KeyStore.getInstance("JKS");
            keyStore.load(new FileInputStream(KEYSTORE_FILE_PATH), KEYSTORE_PASSWORD.toCharArray());
            trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(keyStore);
            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);
        } catch(KeyStoreException |
                IOException |
                NoSuchAlgorithmException |
                CertificateException |
                KeyManagementException
                e) {
            e.printStackTrace();
        }

        ClientConfig config = new DefaultClientConfig();
        config.getProperties().put(HTTPSProperties.PROPERTY_HTTPS_PROPERTIES, new HTTPSProperties(null, sslContext));

        restClient = Client.create(config);
        jsonParser = new JsonParser();
    }

    // </editor-fold>


    // <editor-fold desc="Private Helper Methods">

    private JsonElement getJsonFromRestResponse(ClientResponse response) {
        return jsonParser.parse(clientResponse.getEntity(String.class));
    }

    // </editor-fold>


    // <editor-fold desc="Methods to Make REST Calls">

    public JsonElement get(String restUrl) {
        // Make the REST call and get the REST response
        webResource = restClient.resource(restUrl);
        clientResponse = webResource.accept(responseType).get(ClientResponse.class);

        String responseString = clientResponse.getEntity(String.class);  // DEBUG
        System.out.println(responseString);  // DEBUG

        // Parse the JSON from the REST response and return it as a JsonElement object
//        return getJsonFromRestResponse(clientResponse);

        return jsonParser.parse(responseString);  // DEBUG
    }

    public JsonElement post(String restUrl, String input) {
        // Make the REST call and get the REST response
        webResource = restClient.resource(restUrl);
        clientResponse = webResource.accept(responseType).post(ClientResponse.class, input);

        // Parse the JSON from the REST response and return it as a JsonElement object
        return getJsonFromRestResponse(clientResponse);
    }

    // </editor-fold>
}
