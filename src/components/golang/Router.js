import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SummaryGrid from "./SummaryGrid";
import RoutesGrid from "./RoutesGrid";
import FunctionsGrid from "./FunctionsGrid";

import Explorer from "../Explorer";
import SettingsGrid from "../SettingsGrid";
import GMGrid from "../GMGrid";
import NotFound from "../NotFound";

/**
 * Golang Runtime Router
 * @export
 * @returns JSX.Element
 */
export default function Router() {
  return (
    <Switch>
      {/* Root Redirect */}
      <Route exact path="/" render={() => <Redirect to="/summary" />} />
      {/* Custom Runtime Specific Stuff */}
      <Route component={SummaryGrid} path="/summary" />
      <Route component={RoutesGrid} path="/routes" />
      <Route component={FunctionsGrid} path="/functions" />
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
