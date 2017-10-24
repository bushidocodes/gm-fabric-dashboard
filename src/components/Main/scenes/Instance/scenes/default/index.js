import React from "react";
import { PropTypes } from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import SettingsGrid from "../../../../components/Settings";
import Explorer from "../../../../components/Explorer";
import GMGrid from "../../../../components/GMGrid";
import NotFound from "../../components/NotFound";

Router.propTypes = {
  baseURL: PropTypes.string
};

/**
 * Default Runtime Router for unknown Runtimes
 * @export
 * @returns JSX.Element
 */
export default function Router({ baseURL }) {
  const prefix = baseURL || "";
  return (
    <Switch>
      {/* Root Redirect */}
      <Route
        exact
        path={baseURL ? prefix : "/"}
        render={() => <Redirect to={`${prefix}/explorer`} />}
      />
      {/* General Routes shared by all runtimes */}
      {/* Only route to settings if this we aren't using FabricRouter */}
      {!baseURL && <Route component={SettingsGrid} exact path={`/settings`} />}
      <Route component={Explorer} path={`${prefix}/explorer`} />
      {/* Catch all route for dynamically generated dashboards */}
      <Route component={GMGrid} path={`${prefix}/:dashboardName`} />
      {/* Should never match, but included just in case */}
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
