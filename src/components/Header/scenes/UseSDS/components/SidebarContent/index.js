import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricSidebarContent from "./scenes/Fabric";
import InstanceSidebarContent from "../../../../components/InstanceSidebarContent";

import { getSideBarContent } from "utils/selectors";

// 'new' sidebarContent that routes to FabricSidebarContent || InstanceSidebarContent

SidebarContent.propTypes = {
  services: PropTypes.array
};

function SidebarContent({ services }) {
  return (
    <Switch>
      <Route exact path="/" render={() => <FabricSidebarContent />} />
      <Route
        path="/:serviceName/:serviceVersion/:instanceID"
        component={InstanceSidebarContent}
      />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    services: getSideBarContent(state)
  };
}

export default withRouter(connect(mapStateToProps)(SidebarContent));
