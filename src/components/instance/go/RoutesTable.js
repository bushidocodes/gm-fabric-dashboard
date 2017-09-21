import { PropTypes } from "prop-types";
import React from "react";

import RoutesTableLineItem from "./RoutesTableLineItem";

RoutesTable.propTypes = {
  routes: PropTypes.array
};

/**
 * Go Routes Table 
 * Includes a Header and maps 0..n rows of routes data to RoutesTableLineItems
 * @export
 * @param {any} { routes = [] } 
 * @returns 
 */
export default function RoutesTable({ routes = [] }) {
  return (
    <div className="div-table routes-table">
      <div className="div-table-header">
        <div className="routes-table-route">Route</div>
        <div className="routes-table-sparkline">Requests/sec</div>
        <div className="routes-table-total-requests">Requests</div>
        <div className="routes-table-error-percent">Error %</div>
        <div className="routes-table-error-percent">Latency 50%</div>
        <div className="routes-table-error-percent">Latency 99%</div>
      </div>
      <ol className="div-table-body">
        {routes.map(
          ({
            route,
            verb,
            errorsCount,
            latency50,
            latency99,
            requests,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline
          }) => (
            <RoutesTableLineItem
              errorsCount={errorsCount}
              key={`${route}/${verb}`}
              latency50={latency50}
              latency99={latency99}
              requests={requests}
              requestsPerSecond_dygraph={requestsPerSecond_dygraph}
              requestsPerSecond_sparkline={requestsPerSecond_sparkline}
              route={`${route} `}
              verb={verb}
            />
          )
        )}
      </ol>
    </div>
  );
}
