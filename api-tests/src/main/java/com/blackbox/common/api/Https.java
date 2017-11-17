package com.blackbox.common.api;

import java.io.*;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;
import java.util.stream.Collectors;
import javax.net.ssl.*;

public class Https {

  public static String fetch(KeyManager[] keyManagers, TrustManager[] trustManagers, URL url) throws IOException, KeyManagementException, NoSuchAlgorithmException {
    SSLContext sslContext = SSLContext.getInstance("SSL");
    sslContext.init(keyManagers, trustManagers, new SecureRandom());
    HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
    connection.setHostnameVerifier((String hostname, SSLSession sslSession) -> true);
    connection.setSSLSocketFactory(sslContext.getSocketFactory());
    try (InputStream inputStream = connection.getInputStream();
         InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
         BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {
      return bufferedReader.lines().collect(Collectors.joining("\n"));
    }
  }

  public static KeyStore loadKeyStore(String keyStoreFile, String keyStorePassword) throws CertificateException, IOException, KeyStoreException, NoSuchAlgorithmException {
    try (InputStream inputStream = new FileInputStream(keyStoreFile)) {
      KeyStore keyStore = KeyStore.getInstance("JKS");
      keyStore.load(inputStream, keyStorePassword.toCharArray());
      return keyStore;
    }
  }

  public static KeyManager[] loadKeyManagers(KeyStore keyStore, String keyStorePassword) throws KeyStoreException, NoSuchAlgorithmException, UnrecoverableKeyException {
    KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
    keyManagerFactory.init(keyStore, keyStorePassword.toCharArray());
    return keyManagerFactory.getKeyManagers();
  }

  public static TrustManager[] loadTrustManager(KeyStore trustStore) throws KeyStoreException, NoSuchAlgorithmException {
    TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance("X509");
    trustManagerFactory.init(trustStore);
    return trustManagerFactory.getTrustManagers();
  }

}
