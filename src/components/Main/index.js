import { Actions } from "jumpstate";

import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppContent from "./components/AppContent";

import FabricRouter from "./scenes/Fabric";
import InstanceRouter from "./scenes/Instance";

import { getFabricServer } from "utils/head";
import { getRuntime } from "utils/selectors";

/**
 * Base React Component of GM Fabric Dashboard
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    dashboards: PropTypes.object,
    fabricServer: PropTypes.string.isRequired,
    instancePollingInterval: PropTypes.number.isRequired,
    metricsEndpoint: PropTypes.string,
    pathname: PropTypes.string,
    runtime: PropTypes.string
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

  componentWillUpdate({ dashboards, runtime }) {
    // If the app initially loads before we've gotten a response from the Fabric Server, load the dynamic dashboards
    // once we figure out the runtime
    if (Object.keys(dashboards).length === 0 && runtime) {
      console.log(`Loading dashboards for ${runtime}`);
      Actions.loadDashboardsFromJSON(runtime);
    }
  }

  render() {
    return (
      <AppContent id="main-content" tabIndex="0">
        {/* main-content id is here so that SkipNav can focus on it */}
        {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
        {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
        {/* index.html via the head utils */}
        {getFabricServer() ? (
          <FabricRouter />
        ) : (
          <InstanceRouter runtime={this.props.runtime} />
        )}
      </AppContent>
    );
  }
}

// pathname is used to populate breadcrumbs
// interval, metricsEndpoint, and runtime are used to start polling if running without a Fabric Server
function mapStateToProps(state) {
  const {
    dashboards,
    routing: { location: { pathname } },
    settings: { instancePollingInterval, metricsEndpoint }
  } = state;
  return {
    dashboards,
    instancePollingInterval,
    metricsEndpoint,
    pathname,
    runtime: getRuntime(state)
  };
}

export default withRouter(connect(mapStateToProps)(App));
