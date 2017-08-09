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
import SidebarBranding from "./SidebarBranding";
import SummaryBar from "./SummaryBar";
import SummaryGrid from "./SummaryGrid";
import ThreadsGrid from "./ThreadsGrid";
import NotFound from "./NotFound";

class Container extends Component {
  static propTypes = {
    children: PropTypes.any,
    metricsEndpoints: PropTypes.array,
    pathname: PropTypes.string,
    runtime: PropTypes.string
  };

  // Perform an initial fetch of metrics on mount.
  // This triggers hooks which initialize polling using the default parameters
  componentDidMount() {
    Actions.fetchMetrics(this.props.metricsEndpoints);
    Actions.initLocalStorage();
    Actions.getDashboards();
    if (this.props.runtime === "jvm") Actions.fetchThreads();
  }

  render() {
    return (
      <div id="app-container">
        <nav className="app-sidebar">
          <AppBrandBar />
          <SummaryBar />
          <SidebarBranding />
        </nav>
        <div className="app-content uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <Route exact path="/" render={() => <Redirect to="/summary" />} />
          <div className="app-content-view">
            <Switch>
              {this.props.runtime === "JVM" &&
                <Route component={SummaryGrid} path="/summary" />}
              {this.props.runtime === "JVM" &&
                <Route component={ThreadsGrid} path="/threads" />}
              <Route component={Explorer} path="/explorer" />
              <Route component={SettingsGrid} path="/settings" />
              {this.props.runtime === "JVM" &&
                <Route component={RoutesGrid} path="/route" />}
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
  settings: { metricsEndpoints, runtime },
  routing: { location: { pathname } }
}) {
  return { metricsEndpoints, runtime, pathname };
}

export default withRouter(connect(mapStateToProps)(Container));
