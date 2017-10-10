import { Actions } from "jumpstate";
import styled from "styled-components";
import { edgeColor } from "../style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "../style/styleVariables";

import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppToolBar from "./AppToolBar";
import AppFooter from "./AppFooter";
import SidebarContainer from "./SidebarContainer";
import FabricRouter from "./fabric/FabricRouter";
import InstanceRouter from "./instance/InstanceRouter";

import { getFabricServer } from "../utils/head";
import { getRuntime } from "../utils/selectors";

// toolbar wrapper - do not display scrollbar
const AppContainer = styled.div`
  -ms-overflow-style: none;
  overflow-scrolling: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
`;

// content wrapper - display scrollbar
const AppContent = styled.div`
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-scrolling: touch;
  flex: 1 1 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  background-color: ${COLOR_CONTENT_BACKGROUND};
`;

const AppContentView = styled.div`
  flex: 1 1 100%;
  overflow-y: scroll;
  overflow-scrolling: touch;
  position: relative;
  z-index: 1;
  padding-top: 1px;

  &:before,
  &:after {
    content: "";
    background-color: ${COLOR_CONTENT_BACKGROUND};
    pointer-events: none;
    height: 1px;
    position: absolute;
    top: -134px;
    height: 135px;
    bottom: auto;
    left: 0;
    right: 0;
    z-index: 1001;
  }

  &:after {
    position: fixed;
    background-color: ${edgeColor(COLOR_CONTENT_BACKGROUND, 0.3).fade(0.7)});
    z-index: 1000;
    height: 1px;
    top: 34px;
  }
`;

/**
 * Base React Component of GM Fabric Dashboard
 * @class App
 * @extends {Component}
 */
class App extends Component {
  static propTypes = {
    dashboards: PropTypes.object,
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
      <AppContainer>
        <SidebarContainer />
        <AppContent className="uk-width-5-6@s">
          <AppToolBar pathname={this.props.pathname} />
          <AppContentView>
            {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
            {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
            {/* index.html via the head utils */}
            {getFabricServer() ? (
              <FabricRouter />
            ) : (
              <InstanceRouter runtime={this.props.runtime} />
            )}
          </AppContentView>
          <AppFooter />
        </AppContent>
      </AppContainer>
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
