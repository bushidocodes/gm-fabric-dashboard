import { PropTypes } from "prop-types";
import React from "react";

import RoutesTableLineItem from "./RoutesTableLineItem";

RoutesTable.propTypes = {
  routes: PropTypes.array
};

export default function RoutesTable({ routes = [] }) {
  return (
    <div className="div-table routes-table">
      <div className="div-table-header">
        <div className="routes-table-route">Route</div>
        <div className="routes-table-sparkline">Requests/s</div>
        <div className="routes-table-total-requests">Requests</div>
        <div className="routes-table-error-percent">Error %</div>
      </div>
      <ol className="div-table-body">
        {routes.map(
          ({
            route,
            verb,
            errorRate,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline,
            totalRequests
          }) =>
            <RoutesTableLineItem
              errorRate={errorRate}
              key={`${route}/${verb}`}
              requestsPerSecond_dygraph={requestsPerSecond_dygraph}
              requestsPerSecond_sparkline={requestsPerSecond_sparkline}
              route={route}
              totalRequests={totalRequests}
              verb={verb}
            />
        )}
      </ol>
    </div>
  );
}
