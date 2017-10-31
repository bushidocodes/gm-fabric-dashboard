import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import SidebarNavWidgetTemplate from "../../../components/SidebarNavWidget";

import { trimID } from "utils";

SidebarNavWidget.propTypes = {
  history: PropTypes.object,
  services: PropTypes.object
};

/**
 * Sidebar Nav Component for GM Fabric Dashboard running with Fabric Server
 * Generates the state needed to render the SidebarNavWidget template based on the route
 * 
 * @param {any} { services, history } 
 * @returns JSX.Element
 */
function SidebarNavWidget({ services }) {
  return (
    <Switch>
      <Route
        exact
        path="/:serviceName/"
        render={({
          match: { params: { serviceName, instanceID } },
          history
        }) => {
          const siblings = Object.keys(services).map(svc => ({
            name: svc,
            path: `/${svc}/`
          }));
          return (
            <SidebarNavWidgetTemplate
              elementName={serviceName}
              history={history}
              parent={{ name: "Fabric", path: "/" }}
              parentPathIsExternal={false}
              siblings={siblings}
            />
          );
        }}
      />
      <Route
        path="/:serviceName/:instanceID/"
        render={({
          match: { params: { serviceName, instanceID } },
          history
        }) => {
          const instances =
            services && serviceName && services[serviceName]
              ? services[serviceName].instances
              : [];
          const siblings = instances.map(instance => ({
            name: trimID(instance),
            path: `/${serviceName}/${instance}/`
          }));
          return (
            <SidebarNavWidgetTemplate
              elementName={trimID(instanceID)}
              history={history}
              parent={{ name: serviceName, path: `/${serviceName}/` }}
              parentPathIsExternal={false}
              siblings={siblings}
            />
          );
        }}
      />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    services: state.fabric.services
  };
}

export default withRouter(connect(mapStateToProps)(SidebarNavWidget));
