package com.blackbox.siteSpecific.tests.api;

import com.blackbox.siteSpecific.framework.base.ApiTest;
import org.junit.Test;

import com.blackbox.common.api.Https;

import javax.net.ssl.KeyManager;
import javax.net.ssl.TrustManager;
import java.net.URL;
import java.security.KeyStore;

public class RestApiTest extends ApiTest {

    String SERVICE_URL = "https://edge.deciphernow.com/services/discovery-service/1.0/services";
    String KEYSTORE_FILE = "/Users/joshua.rutherford/keystore.jks";
    String KEYSTORE_PASSWORD = "password";
    String TRUSTSTORE_FILE = "/Users/joshua.rutherford/truststore.jks";
    String TRUSTSTORE_PASSWORD = "password";

    @Test
    public void getListOfServices() throws Exception {

        URL url = new URL(SERVICE_URL);

        KeyStore keyStore = Https.loadKeyStore(KEYSTORE_FILE, KEYSTORE_PASSWORD);
        KeyStore trustStore = Https.loadKeyStore(TRUSTSTORE_FILE, TRUSTSTORE_PASSWORD);

        KeyManager[] keyManagers = Https.loadKeyManagers(keyStore, KEYSTORE_PASSWORD);
        TrustManager[] trustManagers = Https.loadTrustManager(trustStore);

        try {
            String response = Https.fetch(keyManagers, trustManagers, url);
            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }
}
