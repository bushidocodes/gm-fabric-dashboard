import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import SidebarCard from "../SidebarCard";
import InstanceSidebarContent from "../instance/SidebarContent";

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
          return _.map(services, ({ name }) => {
            return (
              <SidebarCard
                href={`/${name}`}
                icon="star"
                key={name}
                title={name}
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
  const { fabric: { services } } = state;
  return {
    services
  };
}

export default withRouter(connect(mapStateToProps)(FabricSidebarContent));
