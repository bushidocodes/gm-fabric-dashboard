import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PropTypes } from "prop-types";

import SummaryGrid from "./scenes/Summary";
import RoutesGrid from "./scenes/Routes";
import FunctionsGrid from "./scenes/Functions";

import Explorer from "components/Main/components/Explorer";
import GMGrid from "components/Main/components/GMGrid";
import SettingsGrid from "components/Main/components/Settings";
import NotFound from "components/Main/scenes/Instance/components/NotFound";

Router.propTypes = {
  baseURL: PropTypes.string
};
/**
 * Go Runtime Router
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
        render={() => <Redirect to={`${prefix}/summary`} />}
      />
      {/* Custom Runtime Specific Stuff */}
      <Route component={SummaryGrid} path={`${prefix}/summary`} />
      <Route component={RoutesGrid} path={`${prefix}/routes`} />
      <Route component={FunctionsGrid} path={`${prefix}/functions`} />
      {/* General Routes shared by all runtimes */}
      {/* Only route to settings if this we aren't using FabricRouter */}
      {!baseURL && <Route component={SettingsGrid} exact path="/settings" />}
      <Route component={Explorer} path={`${prefix}/explorer`} />
      {/* Catch all route for dynamically generated dashboards */}
      <Route component={GMGrid} path={`${prefix}/:dashboardName`} />
      {/* Should never match, but included just in case */}
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
