import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PropTypes } from "prop-types";

import SummaryGrid from "./SummaryGrid";
import RoutesGrid from "./RoutesGrid";
import FunctionsGrid from "./FunctionsGrid";

import Explorer from "../../Explorer";
import GMGrid from "../../library/GMGrid";
import NotFound from "../../library/NotFound";

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
      <Route component={Explorer} path={`${prefix}/explorer`} />
      {/* Catch all route for dynamically generated dashboards */}
      <Route component={GMGrid} path={`${prefix}/:dashboardName`} />
      {/* Should never match, but included just in case */}
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
