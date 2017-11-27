import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppContent from "./components/AppContent";
import { LazyLoader } from "components/LazyLoader";

import { getFabricServer } from "utils/head";
import { getRuntime } from "utils/selectors";

const FabricRouter = LazyLoader({
  loader: () => import("./scenes/FabricView")
});

const InstanceRouter = LazyLoader({
  loader: () => import("./scenes/InstanceView")
});

/**
 * Base React Component of GM Fabric Dashboard
 * @class Main
 * @extends {Component}
 */

// TODO: Replace some of these object types with shapes
class Main extends Component {
  static propTypes = {
    dashboards: PropTypes.object,
    fabricServer: PropTypes.string,
    instanceMetricsPollingInterval: PropTypes.number.isRequired,
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
      Actions.startPollingFabricMicroservices({ endpoint: fabricServer });
    } else {
      console.log("Fabric Server Not Detected");
      // Load the dashboard for the runtime
      Actions.loadDashboardsFromJSON();
      // And begin polling instance metrics directly from the microservice
      Actions.startPollingInstanceMetrics({
        endpoint: this.props.metricsEndpoint
      });
      // Perform initial fetch of threads data if runtime is JVM
      if (this.props.runtime === "jvm") Actions.fetchAndStoreInstanceThreads();
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
    instance: { instanceMetricsPollingInterval },
    routing: { location: { pathname } },
    settings: { metricsEndpoint }
  } = state;
  return {
    dashboards,
    instanceMetricsPollingInterval,
    metricsEndpoint,
    pathname,
    runtime: getRuntime(state)
  };
}

export default withRouter(connect(mapStateToProps)(Main));
