import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { generateSidebarCards } from "../utils/dashboards";

import JVMSidebarContent from "./jvm/SidebarContent";
import GolangSidebarContent from "./golang/SidebarContent";
import DefaultSidebarContent from "./default/SidebarContent";
import { withRouter } from "react-router-dom";

/**
 * Main area of Sidebar containing one or more SidebarCards
 * @class SidebarContent
 * @extends {Component}
 */
class SidebarContent extends Component {
  static propTypes = {
    metrics: PropTypes.object,
    runtime: PropTypes.string,
    sidebarCards: PropTypes.array
  };

  render() {
    const { metrics, runtime, sidebarCards } = this.props;
    switch (runtime) {
      case "JVM":
        return (
          <JVMSidebarContent metrics={metrics} sidebarCards={sidebarCards} />
        );
      case "GOLANG":
        return (
          <GolangSidebarContent metrics={metrics} sidebarCards={sidebarCards} />
        );
      default:
        return (
          <DefaultSidebarContent
            metrics={metrics}
            sidebarCards={sidebarCards}
          />
        );
    }
  }
}

function mapStateToProps(state) {
  const { metrics, settings: { runtime } } = state;
  return {
    metrics,
    sidebarCards: generateSidebarCards(state),
    runtime
  };
}

export default withRouter(connect(mapStateToProps)(SidebarContent));
