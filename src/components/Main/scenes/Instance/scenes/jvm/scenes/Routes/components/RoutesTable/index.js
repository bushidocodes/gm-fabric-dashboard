import { PropTypes } from "prop-types";
import React from "react";

import RoutesTableLineItem from "./components/RoutesTableLineItem";

import Table from "../../../../../../../../../Main/components/Table";
import TableHeader from "../../../../../../../../../Main/components/TableHeader";
import TableColHeader from "../../../../../../../../../Main/components/TableColHeader";
import TableBody from "../../../../../../../../../Main/components/TableBody";

import { relativeReqPercent } from "utils";

RoutesTable.propTypes = {
  routes: PropTypes.array
};

/**
 * Header and 0..n rows of routes data
 * @export
 * @param {any} { routes = [] }
 * @returns
 */
export default function RoutesTable({ routes = [] }) {
  // adds relativeReqPercent field to routes for viz-fill-bar rendering
  routes = relativeReqPercent(routes, "totalRequests");

  return (
    <Table>
      <TableHeader>
        <TableColHeader style={{ flex: "1 1 20%" }}>Route</TableColHeader>
        <TableColHeader>Requests/s</TableColHeader>
        <TableColHeader style={{ textAlign: "right" }}>Requests</TableColHeader>
        <TableColHeader style={{ textAlign: "right" }}>Error %</TableColHeader>
        <TableColHeader style={{ textAlign: "right" }}>
          Latency 50%
        </TableColHeader>
        <TableColHeader style={{ textAlign: "right" }}>
          Latency 99%
        </TableColHeader>
      </TableHeader>
      <TableBody>
        {routes.map(
          ({
            route,
            verb,
            relativeReqPercent,
            errorPercent,
            latency50,
            latency99,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline,
            totalRequests
          }) => (
            <RoutesTableLineItem
              errorPercent={errorPercent}
              key={`${route}/${verb}`}
              latency50={latency50}
              latency99={latency99}
              relativeReqPercent={relativeReqPercent}
              requestsPerSecond_dygraph={requestsPerSecond_dygraph}
              requestsPerSecond_sparkline={requestsPerSecond_sparkline}
              route={route}
              totalRequests={totalRequests}
              verb={verb}
            />
          )
        )}
      </TableBody>
    </Table>
  );
}
