import { PropTypes } from "prop-types";
import React from "react";

import RoutesTableLineItem from "./components/LineItem";

import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableBody from "components/Main/components/TableBody";

import { relativeReqPercent } from "utils";

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
  // adds relativeReqPercent field to routes for viz-fill-bar rendering
  routes = relativeReqPercent(routes, "requests");

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
            errorsCount,
            errorPercent,
            latency50,
            latency99,
            relativeReqPercent,
            requests,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline
          }) => {
            return (
              <RoutesTableLineItem
                errorsCount={errorsCount}
                errorPercent={errorPercent}
                key={`${route}/${verb}`}
                latency50={latency50}
                latency99={latency99}
                relativeReqPercent={relativeReqPercent}
                requests={requests}
                requestsPerSecond_dygraph={requestsPerSecond_dygraph}
                requestsPerSecond_sparkline={requestsPerSecond_sparkline}
                route={`${route} `}
                verb={verb}
              />
            );
          }
        )}
      </TableBody>
    </Table>
  );
}
