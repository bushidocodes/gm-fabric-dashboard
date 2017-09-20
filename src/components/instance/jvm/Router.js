import React from "react";
import { PropTypes } from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import SummaryGrid from "./SummaryGrid";
import ThreadsGrid from "./ThreadsGrid";
import RoutesGrid from "./RoutesGrid";

import Explorer from "../../Explorer";
import GMGrid from "../../library/GMGrid";
import NotFound from "../../library/NotFound";

Router.propTypes = {
  baseURL: PropTypes.string
};

/**
 * JVM Runtime Router
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
      <Route component={ThreadsGrid} path={`${prefix}/threads`} />
      <Route component={RoutesGrid} path={`${prefix}/route`} />
      {/* General Routes shared by all runtimes */}
      <Route component={Explorer} path={`${prefix}/explorer`} />
      {/* Catch all route for dynamically generated dashboards */}
      <Route component={GMGrid} path={`${prefix}/:dashboardName`} />
      {/* Should never match, but included just in case */}
      <Route component={NotFound} path="*" />
    </Switch>
  );
}
