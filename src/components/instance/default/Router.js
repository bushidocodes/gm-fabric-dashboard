import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Explorer from "../../Explorer";
import GMGrid from "../../library/GMGrid";
import NotFound from "../../library/NotFound";
import SettingsGrid from "../../SettingsGrid";

/**
 * Default Runtime Router for unknown Runtimes
 * @export
 * @returns JSX.Element
 */
export default function Router() {
  return (
    <Switch>
      {/* Root Redirect */}
      <Route exact path="/" render={() => <Redirect to="/explorer" />} />
      {/* General Routes shared by all runtimes */}
      <Route component={Explorer} path="/explorer" />
      <Route component={SettingsGrid} path="/settings" />
      {/* Catch all route for dynamically generated dashboards */}
      <Route component={GMGrid} path="/:dashboardName" />
      {/* Should never match, but included just in case */}
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
