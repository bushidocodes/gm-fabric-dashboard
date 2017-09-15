import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

import DefaultRouter from "./default/Router";
import GolangRouter from "./golang/Router";
import JVMRouter from "./jvm/Router";

/**
 * InstanceRouter
 * @export
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
export default class InstanceRouter extends Component {
  static propTypes = {
    baseURL: PropTypes.string, // An optional baseURL if running under Fabric Server
    instanceID: PropTypes.string,
    runtime: PropTypes.string.isRequired,
    serviceName: PropTypes.string
  };

  componentWillMount() {
    const { serviceName, instanceID } = this.props;
    if (serviceName && instanceID) {
      Actions.selectInstance({
        instanceID,
        serviceName
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { serviceName, instanceID } = nextProps;
    if (serviceName && instanceID) {
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
