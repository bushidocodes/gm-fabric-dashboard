import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import JVMHeaderContent from "./scenes/JVMHeaderContent";
import GoHeaderContent from "./scenes/GoHeaderContent";
import DefaultHeaderContent from "./scenes/DefaultHeaderContent";

import { generateHeaderTabs } from "utils/selectors";
import { decodeParameter } from "utils";
import {
  routerHistoryShape,
  routerLocationShape,
  routerMatchShape
} from "components/PropTypes";

/**
 * Main area of Header containing one or more Tabs
 * @class InstanceHeaderContent
 * @extends {Component}
 */

class InstanceHeaderContent extends Component {
  static propTypes = {
    basePath: PropTypes.string,
    headerTabs: PropTypes.arrayOf(PropTypes.element),
    history: routerHistoryShape,
    location: routerLocationShape,
    match: routerMatchShape,
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
      state.fabric.services[`${decodeParameter(serviceName)}|${serviceVersion}`]
        ? state.fabric.services[
            `${decodeParameter(serviceName)}|${serviceVersion}`
          ].runtime
        : runtime,
    headerTabs: generateHeaderTabs(state)
  };
}

export default withRouter(connect(mapStateToProps)(InstanceHeaderContent));
