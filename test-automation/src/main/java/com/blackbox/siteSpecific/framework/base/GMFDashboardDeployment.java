package com.blackbox.siteSpecific.framework.base;

import java.util.Map;


public class GMFDashboardDeployment {
    public String siteUrl;
    public String deploymentFlag, browserFlag;
    public BrowserType browserType;

    public String stableServiceName;
    public int stableServiceInstanceIndex;

    public GMFDashboardDeployment() {
        // Load the system deployment variables
        Map<String, String> systemEnvironment = System.getenv();
        deploymentFlag = System.getProperty("blackbox.environment", "local");
        browserFlag = System.getProperty("blackbox.browser", "chrome");

        if(deploymentFlag.toUpperCase().equals("LOCAL")) {
            siteUrl = "http://localhost:3000";

            stableServiceName = "Entry Mail Debugger";
            stableServiceInstanceIndex = 1;
        }

        // Set the browser type
        if(browserFlag.toUpperCase().equals("FIREFOX")) {
            browserType = BrowserType.MOZILLA_FIREFOX;
        } else if(browserFlag.toUpperCase().equals("CHROME")) {
            browserType = BrowserType.GOOGLE_CHROME;
        }
    }
}
