import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import SidebarCard from "../SidebarCard";
import InstanceSidebarContent from "../instance/SidebarContent";

import { getSideBarContent } from "../../utils/selectors";

FabricSidebarContent.propTypes = {
  services: PropTypes.object
};

export function FabricSidebarContent({ services }) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return _.map(services, ({ state }) => {
            return (
              <SidebarCard
                href={`/${state}`}
                icon="star"
                key={state}
                title={state}
              />
            );
          });
        }}
      />
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

export default withRouter(connect(mapStateToProps)(FabricSidebarContent));
