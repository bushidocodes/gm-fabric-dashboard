import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect, Switch } from "react-router-dom";

import AppBrandBar from "./AppBrandBar";
import AppToolBar from "./AppToolBar";
import AppFooter from "./AppFooter";
import Explorer from "./Explorer";
import GMGrid from "./GMGrid";
import NotFound from "./NotFound";
import RoutesGridJVM from "./jvm/RoutesGrid";
import SettingsGrid from "./SettingsGrid";
import Sidebar from "./Sidebar";
import SidebarFooter from "./SidebarFooter";
import SummaryGridJVM from "./jvm/SummaryGrid";
import SummaryGridGolang from "./golang/SummaryGrid";
import ThreadsGridJVM from "./jvm/ThreadsGrid";

import GMFabricBg from "../images/gm-fabric-bg.jpg";

/** Base React Component of UI  */
class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    metricsEndpoint: PropTypes.string,
    pathname: PropTypes.string,
    runtime: PropTypes.string
  };

  /** Perform initial setup when the App first loads */
  componentDidMount() {
    // Perform an initial fetch of metrics from the metrics endpoint
    Actions.fetchMetrics(this.props.metricsEndpoint);
    // Initialize Local storage and then fetch dashboards
    Actions.initLocalStorage()
      .then(isInitialized => {
        if (isInitialized) {
          return Actions.getDashboards();
        } else {
          throw new Error("Local Storage failed to initialize");
        }
      })
      .catch(err => console.error(err));
    // Perform initial fetch of threads data if runtime is JVM
    if (this.props.runtime === "jvm") Actions.fetchThreads();
  }

  /**
   * Generate React Router v4 JSX routes based on the current runtime
   * @param {string} runtime - The application runtime
   */
  generateRoutes(runtime) {
    switch (runtime) {
      case "JVM":
        return (
          <Switch>
            {/* Custom Runtime Specific Stuff */}
            <Route component={SummaryGridJVM} path="/summary" />
            <Route component={ThreadsGridJVM} path="/threads" />
            <Route component={RoutesGridJVM} path="/route" />
            {/* General Routes shared by all runtimes */}
            <Route component={Explorer} path="/explorer" />
            <Route component={SettingsGrid} path="/settings" />
            {/* Catch all route for dynamically generated dashboards */}
            <Route component={GMGrid} path="/:dashboardName" />
            {/* Should never match, but included just in case */}
            <Route component={NotFound} path="*" />
          </Switch>
        );
      case "GOLANG":
        return (
          <Switch>
            {/* Custom Runtime Specific Stuff */}
            <Route component={SummaryGridGolang} path="/summary" />
            {/* General Routes shared by all runtimes */}
            <Route component={Explorer} path="/explorer" />
            <Route component={SettingsGrid} path="/settings" />
            {/* Catch all route for dynamically generated dashboards */}
            <Route component={GMGrid} path="/:dashboardName" />
            {/* Should never match, but included just in case */}
            <Route component={NotFound} path="*" />
          </Switch>
        );
      default:
        return (
          <Switch>
            {/* General Routes shared by all runtimes */}
            <Route component={Explorer} path="/explorer" />
            <Route component={SettingsGrid} path="/settings" />
            {/* Catch all route for dynamically generated dashboards */}
            <Route component={GMGrid} path="/:dashboardName" />
            {/* Should never match, but included just in case */}
            <Route component={NotFound} path="*" />
          </Switch>
        );
    }
  }

  render() {
    return (
      <div id="app-container">
        {/* Note: the following backgroundImage tag was inlined to get the URL to properly resolve.*/}
        {/* This is currently resulting in a flicker on initial load, as the inline styles load first.*/}
        <nav
          className="app-sidebar"
          style={{ backgroundImage: `url(${GMFabricBg})` }}
        >
          <AppBrandBar />
          <Sidebar />
          <SidebarFooter />
        </nav>
        <div className="app-content uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <Route exact path="/" render={() => <Redirect to="/summary" />} />
          <div className="app-content-view">
            {this.generateRoutes(this.props.runtime)}
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
