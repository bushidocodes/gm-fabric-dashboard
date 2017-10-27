import { PropTypes } from "prop-types";
import React from "react";

import RoutesTableLineItem from "./components/LineItem";

import Table from "../../../../../../../../components/Table";
import TableHeader from "../../../../../../../../components/TableHeader";
import TableCol from "../../../../../../../../components/TableCol";
import TableBody from "../../../../../../../../components/TableBody";

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
    <Table>
      <TableHeader>
        <TableCol header>Routes</TableCol>
        <TableCol header>Requests/sec</TableCol>
        <TableCol header>Requests</TableCol>
        <TableCol header>Error %</TableCol>
        <TableCol header>Latency 50%</TableCol>
        <TableCol header>Latency 99%</TableCol>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  );
}
