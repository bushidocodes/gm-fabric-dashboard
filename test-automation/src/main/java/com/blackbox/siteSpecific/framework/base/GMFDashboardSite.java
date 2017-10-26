package com.blackbox.siteSpecific.framework.base;

import com.blackbox.siteSpecific.framework.pages.*;
import org.openqa.selenium.WebDriver;
import com.blackbox.common.selenium.WebSite;


public class GMFDashboardSite extends WebSite {

    // <editor-fold desc="Constructor">

	public GMFDashboardSite(WebDriver driver) {
		super(driver);
	}

    // </editor-fold>


    // <editor-fold desc="Convenience Method for logging out and going to the root">

    public DashboardPage openSite(GMFDashboardDeployment deployment) {
        driverutil.open(deployment.siteUrl);
        return this.setCurrentPage(DashboardPage.class);
    }

    // </editor-fold>


    // <editor-fold desc="Convenience Methods for Accessing Pages Classes">

    public DashboardPage dashboard() { return this.getCurrentPage(); }
    public InstancesPage instances() { return this.getCurrentPage(); }
    public SummaryPage summary() { return this.getCurrentPage(); }
    public RoutesPage routes() { return this.getCurrentPage(); }
    public ThreadsPage threads() { return this.getCurrentPage(); }
    public HttpPage http() { return this.getCurrentPage(); }
    public JvmPage jvm() { return this.getCurrentPage(); }
    public FinaglePage finagle() { return this.getCurrentPage(); }
    public ExplorerPage explorer() { return this.getCurrentPage(); }
    public SettingsPage settings() { return this.getCurrentPage(); }

    // </editor-fold>
}
