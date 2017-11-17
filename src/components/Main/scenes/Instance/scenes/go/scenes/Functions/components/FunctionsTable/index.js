import { PropTypes } from "prop-types";
import React from "react";

import FunctionsTableLineItem from "./components/LineItem";

import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableBody from "components/Main/components/TableBody";

import { relativeReqPercent } from "utils";

FunctionsTable.propTypes = {
  funcs: PropTypes.array
};

/**
 * Go Functions Table
 * Includes a Header and maps 0..n rows of functions data to FunctionsTableLineItems
 * @export
 * @param {any} { funcs = [] }
 * @returns
 */
export default function FunctionsTable({ funcs = [] }) {
  // adds relativeReqPercent field to funcs for viz-fill-bar rendering
  funcs = relativeReqPercent(funcs, "requests");

  return (
    <Table>
      <TableHeader>
        <TableColHeader style={{ flex: "1 1 20%" }}>Function</TableColHeader>
        <TableColHeader>Requests/sec</TableColHeader>
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
        {funcs.map(
          ({
            func,
            errorsCount,
            errorPercent,
            inThroughput,
            outThroughput,
            latency50,
            latency99,
            relativeReqPercent,
            requests,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline
          }) => (
            <FunctionsTableLineItem
              errorsCount={errorsCount}
              errorPercent={errorPercent}
              func={func}
              key={func}
              latency50={latency50}
              latency99={latency99}
              relativeReqPercent={relativeReqPercent}
              requests={requests}
              requestsPerSecond_dygraph={requestsPerSecond_dygraph}
              requestsPerSecond_sparkline={requestsPerSecond_sparkline}
            />
          )
        )}
      </TableBody>
    </Table>
  );
}
