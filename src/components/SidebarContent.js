// import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import SidebarCard from "./SidebarCard";

import JVMSidebarContent from "./instance/jvm/SidebarContent";
import GoSidebarContent from "./instance/go/SidebarContent";
import DefaultSidebarContent from "./instance/default/SidebarContent";

// import { generateSidebarCards } from "../../utils/selectors";

/**
 * Main area of Sidebar containing one or more SidebarCards
 * @class SidebarContent
 * @extends {Component}
 */
class SidebarContent extends Component {
  static propTypes = {
    basePath: PropTypes.string,
    metrics: PropTypes.object.isRequired,
    runtime: PropTypes.string,
    // serviceName: PropTypes.string,
    sidebarCards: PropTypes.array
  };

  render() {
    const {
      basePath,
      metrics,
      runtime,
      // serviceName,
      // services,
      // instanceID,
      sidebarCards
    } = this.props;
    // Render Services if the path does not contain a selected service or instances
    // _.map(services[serviceName].instances, ({ instanceID }) => {
    //   return (
    //     <SidebarCard
    //       href={`/${services[serviceName].path}/${instanceID}`}
    //       icon="star"
    //       key={instanceID}
    //       title={instanceID}
    //     />
    //   );
    // });

    switch (runtime) {
      case "JVM":
        return (
          <JVMSidebarContent
            basePath={basePath}
            metrics={metrics}
            sidebarCards={sidebarCards}
          />
        );
      case "GO":
        return (
          <GoSidebarContent
            basePath={basePath}
            metrics={metrics}
            sidebarCards={sidebarCards}
          />
        );
      default:
        return (
          <DefaultSidebarContent
            basePath={basePath}
            metrics={metrics}
            sidebarCards={sidebarCards}
          />
        );
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { metrics, settings: { runtime } } = state;
  const { match: { params: { serviceName, instanceID } } } = ownProps;
  return {
    metrics,
    basePath: serviceName && instanceID ? `/${serviceName}/${instanceID}` : "",
    runtime:
      state.fabric.services &&
      ownProps.match.params.serviceName &&
      state.fabric.services[ownProps.match.params.serviceName]
        ? state.fabric.services[ownProps.match.params.serviceName].runtime
        : runtime
  };
}

export default withRouter(connect(mapStateToProps)(SidebarContent));
