import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricSidebarContent from "./fabric/FabricSidebarContent";
import InstanceSidebarContent from "./instance/SidebarContent";

import { getSideBarContent } from "../utils/selectors";

// 'new' sidebarContent that routes to FabricSidebarContent || InstanceSidebarContent

SidebarContent.propTypes = {
  services: PropTypes.object
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
