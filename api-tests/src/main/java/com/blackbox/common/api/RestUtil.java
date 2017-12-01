package com.blackbox.common.api;

import com.blackbox.common.helpers.KeystoreModel;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import javax.net.ssl.*;
import java.io.IOException;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.*;

public class RestUtil {
    JsonParser jsonParser;
    KeyStore keystore;
    KeyStore truststore;
    KeyManager[] keyManagers;
    TrustManager[] trustManagers;


    // <editor-fold desc="Constructor">

    public RestUtil(KeystoreModel truststoreFile, KeystoreModel keystoreFile) {

        try {
            keystore = Https.loadKeyStore(keystoreFile.getPath(), keystoreFile.getPassword());
            truststore = Https.loadKeyStore(truststoreFile.getPath(), truststoreFile.getPassword());
            keyManagers = Https.loadKeyManagers(keystore, keystoreFile.getPassword());
            trustManagers = Https.loadTrustManager(truststore);
        } catch(CertificateException |
                IOException |
                KeyStoreException |
                NoSuchAlgorithmException |
                UnrecoverableKeyException
                e) {
            e.printStackTrace();
        }

        jsonParser = new JsonParser();
    }

    // </editor-fold>


    // <editor-fold desc="Methods to Make REST Calls">

    public JsonElement get(String url) {
        URL convertedUrl;
        String response;

        try {
            convertedUrl = new URL(url);
            response = Https.fetch(keyManagers, trustManagers, convertedUrl);
        } catch(NoSuchAlgorithmException |
                KeyManagementException
                e) {
            throw new RuntimeException(e);
        } catch(IOException e) {
            throw new ApiTestingException(e);
        }

        return jsonParser.parse(response);
    }

    // </editor-fold>
}
