import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SummaryGrid from "./SummaryGrid";
import ThreadsGrid from "./ThreadsGrid";
import RoutesGrid from "./RoutesGrid";

import Explorer from "../Explorer";
import SettingsGrid from "../SettingsGrid";
import GMGrid from "../GMGrid";
import NotFound from "../NotFound";

/**
 * JVM Runtime Router
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
      <Route component={ThreadsGrid} path="/threads" />
      <Route component={RoutesGrid} path="/route" />
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
