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
import RoutesGrid from "./RoutesGrid";
import SettingsGrid from "./SettingsGrid";
import SidebarFooter from "./SidebarFooter";
import SummaryBar from "./SummaryBar";
import SummaryGrid from "./SummaryGrid";
import ThreadsGrid from "./ThreadsGrid";
import NotFound from "./NotFound";

class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    metricsEndpoint: PropTypes.string,
    pathname: PropTypes.string,
    runtime: PropTypes.string
  };

  // Perform an initial fetch of metrics on mount.
  // This triggers hooks which initialize polling using the default parameters
  componentDidMount() {
    Actions.fetchMetrics(this.props.metricsEndpoint);
    Actions.initLocalStorage()
      .then(isInitialized => {
        if (isInitialized) {
          return Actions.getDashboards();
        } else {
          throw new Error("Local Storage failed to initialize");
        }
      })
      .catch(err => console.error(err));
    if (this.props.runtime === "jvm") Actions.fetchThreads();
  }

  render() {
    return (
      <div id="app-container">
        <nav className="app-sidebar">
          <AppBrandBar />
          <SummaryBar />
          <SidebarFooter />
        </nav>
        <div className="app-content uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <Route exact path="/" render={() => <Redirect to="/summary" />} />
          <div className="app-content-view">
            <Switch>
              {this.props.runtime === "JVM" && (
                <Route component={SummaryGrid} path="/summary" />
              )}
              {this.props.runtime === "JVM" && (
                <Route component={ThreadsGrid} path="/threads" />
              )}
              <Route component={Explorer} path="/explorer" />
              <Route component={SettingsGrid} path="/settings" />
              {this.props.runtime === "JVM" && (
                <Route component={RoutesGrid} path="/route" />
              )}
              <Route component={GMGrid} path="/dashboard/:dashboardName" />
              <Route component={NotFound} path="*" />
            </Switch>
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
