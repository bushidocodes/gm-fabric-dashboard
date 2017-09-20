import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppToolBar from "./AppToolBar";
import AppFooter from "./AppFooter";
import Sidebar from "./Sidebar";
import FabricRouter from "./fabric/FabricRouter";
import InstanceRouter from "./instance/InstanceRouter";

import { getFabricServer } from "../utils/head";

/**
 * Base React Component of GM Fabric Dashboard
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    dashboards: PropTypes.object,
    instancePollingInterval: PropTypes.number.isRequired,
    metricsEndpoint: PropTypes.string,
    pathname: PropTypes.string,
    runtime: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string,
    services: PropTypes.object
  };

  /** Perform initial setup when the App first loads */
  componentDidMount() {
    const fabricServer = getFabricServer();
    if (fabricServer) {
      console.log("Fabric Server Detected");
      // Begin polling Fabric-wide metrics from the Fabric Server
      Actions.startPollingFabric();
    } else {
      console.log("Fabric Server Not Detected");
      // Load the dashboard for the runtime
      Actions.loadDashboardsFromJSON();
      // And begin polling instance metrics directly from the microservice
      Actions.startPollingInstanceWithoutServer({
        endpoint: this.props.metricsEndpoint,
        interval: this.props.instancePollingInterval
      });
      // Perform initial fetch of threads data if runtime is JVM
      if (this.props.runtime === "jvm") Actions.fetchThreads();

      // Note: Disabled use of local forage for initial release
      // Initialize Local storage and then fetch dashboards
      // Actions.initLocalStorage()
      //   .then(isInitialized => {
      //     if (isInitialized) {
      //       return Actions.getDashboards();
      //     } else {
      //       throw new Error("Local Storage failed to initialize");
      //     }
      //   })
      //   .catch(err => console.error(err));
    }
  }

  componentWillUpdate({
    dashboards,
    services,
    selectedService,
    selectedServiceVersion
  }) {
    // If the app initially loads before we've gotten a response from the Fabric Server, load the dynamic dashboards
    // once we figure out the runtime
    if (
      Object.keys(dashboards).length === 0 &&
      Object.keys(services).length > 0 &&
      selectedService &&
      selectedServiceVersion
    ) {
      console.log(
        "Loading dashboards",
        `${selectedService}|${selectedServiceVersion}`
      );
      Actions.loadDashboardsFromJSON(
        services[`${selectedService}|${selectedServiceVersion}`].runtime
      );
    }
  }

  render() {
    return (
      <div id="app-container">
        <Sidebar />
        <div className="app-content uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <div className="app-content-view">
            {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
            {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
            {/* index.html via the head utils */}
            {getFabricServer() ? (
              <FabricRouter />
            ) : (
              <InstanceRouter runtime={this.props.runtime} />
            )}
          </div>
          <AppFooter />
        </div>
      </div>
    );
  }
}

// pathname is used to populate breadcrumbs
// interval, metricsEndpoint, and runtime are used to start polling if running without a Fabric Server
function mapStateToProps({
  dashboards,
  fabric: { services },
  routing: { location: { pathname } },
  settings: {
    instancePollingInterval,
    metricsEndpoint,
    runtime,
    selectedService,
    selectedServiceVersion
  }
}) {
  return {
    dashboards,
    services,
    selectedService,
    selectedServiceVersion,
    instancePollingInterval,
    metricsEndpoint,
    pathname,
    runtime
  };
}

export default withRouter(connect(mapStateToProps)(App));
