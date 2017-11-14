import React from "react";
import { PropTypes } from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { LazyLoader } from "components/LazyLoader";
import NotFound from "components/Main/scenes/Instance/components/NotFound";

const SettingsGrid = LazyLoader({
  loader: () => import("components/Main/components/Settings")
});

const Explorer = LazyLoader({
  loader: () => import("components/Main/components/Explorer")
});

const GMGrid = LazyLoader({
  loader: () => import("components/Main/components/GMGrid")
});

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
