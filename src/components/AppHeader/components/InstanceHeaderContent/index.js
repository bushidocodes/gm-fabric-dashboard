import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import JVMHeaderContent from "./scenes/JVM";
import GoHeaderContent from "./scenes/Go";
import DefaultHeaderContent from "./scenes/Default";

import { generateHeaderTabs } from "utils/selectors";

/**
 * Main area of Sidebar containing one or more SidebarCards
 * @class SidebarContent
 * @extends {Component}
 */
class AppHeaderContent extends Component {
  static propTypes = {
    basePath: PropTypes.string,
    headerTabs: PropTypes.array,
    metrics: PropTypes.object.isRequired,
    runtime: PropTypes.string
  };

  render() {
    const { basePath, metrics, runtime, headerTabs } = this.props;

    switch (runtime) {
      case "JVM":
        return (
          <JVMHeaderContent
            basePath={basePath}
            metrics={metrics}
            headerTabs={headerTabs}
          />
        );
      case "GO":
        return (
          <GoHeaderContent
            basePath={basePath}
            metrics={metrics}
            headerTabs={headerTabs}
          />
        );
      default:
        return (
          <DefaultHeaderContent
            basePath={basePath}
            metrics={metrics}
            headerTabs={headerTabs}
          />
        );
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { instance: { metrics }, settings: { runtime } } = state;
  const {
    match: { params: { serviceName, serviceVersion, instanceID } }
  } = ownProps;
  return {
    metrics,
    basePath:
      serviceName && serviceVersion && instanceID
        ? `/${serviceName}/${serviceVersion}/${instanceID}`
        : "",
    runtime:
      state.fabric.services &&
      serviceName &&
      serviceVersion &&
      state.fabric.services[`${serviceName}|${serviceVersion}`]
        ? state.fabric.services[`${serviceName}|${serviceVersion}`].runtime
        : runtime,
    headerTabs: generateHeaderTabs(state)
  };
}

export default withRouter(connect(mapStateToProps)(AppHeaderContent));
