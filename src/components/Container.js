import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppToolBar from "./AppToolBar";
import AppFooter from "./AppFooter";

import Sidebar from "./Sidebar";
import Router from "./Router";

/**
 * Base React Component of App
 * @class Container
 * @extends {Component}
 */
class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    metricsEndpoint: PropTypes.string,
    pathname: PropTypes.string,
    runtime: PropTypes.string
  };

  /** Perform initial setup when the App first loads */
  componentDidMount() {
    // Note: Disabled use of local forage for initial release
    // Perform an initial fetch of metrics from the metrics endpoint
    // Actions.fetchMetrics(this.props.metricsEndpoint);
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
    Actions.loadDashboardsFromJSON();
    // Perform initial fetch of threads data if runtime is JVM
    if (this.props.runtime === "jvm") Actions.fetchThreads();
  }

  render() {
    return (
      <div id="app-container">
        <Sidebar />
        <div className="app-content uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <div className="app-content-view">
            <Router runtime={this.props.runtime} />
          </div>
          <AppFooter />
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  settings: { metricsEndpoint, runtime },
  routing: { location: { pathname } }
}) {
  return { metricsEndpoint, runtime, pathname };
}

export default withRouter(connect(mapStateToProps)(Container));
