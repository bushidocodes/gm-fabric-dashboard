package com.blackbox.siteSpecific.framework.base;

import com.blackbox.common.helpers.KeystoreModel;

import java.util.Map;


public class SiteDeployment {
    public String siteUrl;
    public String discoveryServiceUrl;
    public String deploymentFlag, browserFlag;
    public BrowserType browserType;
    public KeystoreModel truststore;
    public KeystoreModel testerOneKeystore, testerTwoKeystore;

    public SiteDeployment() {
        // Load the system deployment variables
        Map<String, String> systemEnvironment = System.getenv();

        deploymentFlag = System.getProperty("blackbox.environment", "edge");
        browserFlag = System.getProperty("blackbox.browser", "chrome");

        truststore = new KeystoreModel.KeystoreModelBuilder()
                .setPath(System.getProperty("blackbox.truststore", "/opt/truststore-josh.jks"))
                .setPassword(System.getProperty("blackbox.truststorePassword", "password"))
                .build();
        testerOneKeystore = new KeystoreModel.KeystoreModelBuilder()
                .setPath(System.getProperty("blackbox.testerOneKeystore", "/opt/tester01.jks"))
                .setPassword(System.getProperty("blackbox.testerOneKeystorePassword", "password"))
                .build();
        testerTwoKeystore = new KeystoreModel.KeystoreModelBuilder()
                .setPath(System.getProperty("blackbox.testerTwoKeystore", "/opt/tester02.jks"))
                .setPassword(System.getProperty("blackbox.testerTwoKeystorePassword", "password"))
                .build();

        if(deploymentFlag.toUpperCase().equals("EDGE")) {
            siteUrl = "https://edge.deciphernow.com";

            discoveryServiceUrl = "https://edge.deciphernow.com/services/discovery-service/1.0";
        }

        // Set the browser type
        if(browserFlag.toUpperCase().equals("FIREFOX")) {
            browserType = BrowserType.MOZILLA_FIREFOX;
        } else if(browserFlag.toUpperCase().equals("CHROME")) {
            browserType = BrowserType.GOOGLE_CHROME;
        }
    }
}
