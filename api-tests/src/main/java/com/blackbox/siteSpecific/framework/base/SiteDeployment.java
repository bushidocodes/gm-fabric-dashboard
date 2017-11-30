package com.blackbox.siteSpecific.framework.base;

import java.util.Map;


public class SiteDeployment {
    public String siteUrl;
    public String discoveryServiceUrl;
    public String finderServiceUrl;
    public String deploymentFlag, browserFlag;
    public BrowserType browserType;

    public SiteDeployment() {
        // Load the system deployment variables
        Map<String, String> systemEnvironment = System.getenv();
        deploymentFlag = System.getProperty("blackbox.environment", "edge");
        browserFlag = System.getProperty("blackbox.browser", "chrome");

        if(deploymentFlag.toUpperCase().equals("EDGE")) {
            siteUrl = "https://edge.deciphernow.com";

            discoveryServiceUrl = "https://edge.deciphernow.com/services/discovery-service/1.0";
            finderServiceUrl = "https://edge.deciphernow.com/services/finder-service/1.0/";
        }

        // Set the browser type
        if(browserFlag.toUpperCase().equals("FIREFOX")) {
            browserType = BrowserType.MOZILLA_FIREFOX;
        } else if(browserFlag.toUpperCase().equals("CHROME")) {
            browserType = BrowserType.GOOGLE_CHROME;
        }
    }
}
