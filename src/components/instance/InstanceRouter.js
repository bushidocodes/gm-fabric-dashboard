import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DefaultRouter from "./default/Router";
import GolangRouter from "./golang/Router";
import JVMRouter from "./jvm/Router";

/**
 * InstanceRouter is an intermediate router that 
 * @export
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
class InstanceRouter extends Component {
  static propTypes = {
    baseURL: PropTypes.string, // Computed value derived and passed from Fabric Router if running under Fabric Server
    instanceID: PropTypes.string, // Route param passed from Fabric Router if running under Fabric Server
    runtime: PropTypes.string.isRequired,
    selectedInstance: PropTypes.string,
    serviceName: PropTypes.string // Route param passed from Fabric Router if running under Fabric Server
  };

  // Lifecycle hook used to fire selectInstance if needed when running under a Fabric Server
  componentWillMount() {
    // If we were passed a serviceName and instanceID, we assume we are running under a Fabric Server
    const { instanceID, selectedInstance, serviceName } = this.props;
    if (serviceName && instanceID && instanceID !== selectedInstance) {
      Actions.selectInstance({
        instanceID,
        serviceName
      });
    }
  }

  // Lifecycle hook used to fire selectInstance if needed when running under a Fabric Server
  componentWillReceiveProps(nextProps) {
    // If we were passed a serviceName and instanceID, we assume we are running under a Fabric Server
    const { instanceID, selectedInstance, serviceName } = nextProps;
    if (serviceName && instanceID && instanceID !== selectedInstance) {
      Actions.selectInstance({
        instanceID,
        serviceName
      });
    }
  }

  render() {
    const { baseURL, runtime } = this.props;
    switch (runtime) {
      case "JVM":
        return <JVMRouter baseURL={baseURL} />;
      case "GOLANG":
        return <GolangRouter baseURL={baseURL} />;
      default:
        return <DefaultRouter baseURL={baseURL} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedInstance: state.settings.selectedInstance
  };
}

export default withRouter(connect(mapStateToProps)(InstanceRouter));
