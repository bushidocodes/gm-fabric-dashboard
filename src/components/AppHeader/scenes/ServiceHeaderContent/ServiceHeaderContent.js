import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";
import { decodeParameter } from "utils";

ServiceHeaderContent.propTypes = {
  instanceCount: PropTypes.number,
  pathname: PropTypes.string
};

function ServiceHeaderContent({ instanceCount, pathname }) {
  return (
    <TabNav>
      <Tab
        title="Instances"
        href={pathname}
        icon="Summary"
        lines={[
          {
            name: "Instances",
            value: instanceCount || 0
          }
        ]}
      />
    </TabNav>
  );
}

function mapStateToProps(state, ownProps) {
  const { fabric: { services } } = state;
  const {
    match: { params: { serviceName, serviceVersion } },
    location: { pathname }
  } = ownProps;
  return {
    instanceCount:
      services &&
      services[`${decodeParameter(serviceName)}|${serviceVersion}`] &&
      services[`${decodeParameter(serviceName)}|${serviceVersion}`].instances &&
      services[`${decodeParameter(serviceName)}|${serviceVersion}`].instances
        .length,
    pathname
  };
}

export default withRouter(connect(mapStateToProps)(ServiceHeaderContent));
