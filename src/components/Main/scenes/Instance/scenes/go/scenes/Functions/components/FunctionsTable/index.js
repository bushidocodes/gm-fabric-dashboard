import { PropTypes } from "prop-types";
import React from "react";

import FunctionsTableLineItem from "./components/LineItem";
import Table from "../../../../../../../../components/Table";
import TableHeader from "../../../../../../../../components/TableHeader";
import TableCol from "../../../../../../../../components/TableCol";
import TableBody from "../../../../../../../../components/TableBody";

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
  return (
    <Table>
      <TableHeader>
        <TableCol header>Function</TableCol>
        <TableCol header>Requests/sec</TableCol>
        <TableCol header>Requests</TableCol>
        <TableCol header>Error %</TableCol>
        <TableCol header>Latency 50%</TableCol>
        <TableCol header>Latency 99%</TableCol>
      </TableHeader>
      <TableBody>
        {funcs.map(
          ({
            func,
            errorsCount,
            inThroughput,
            outThroughput,
            latency50,
            latency99,
            requests,
            requestsPerSecond_dygraph,
            requestsPerSecond_sparkline
          }) => (
            <FunctionsTableLineItem
              errorsCount={errorsCount}
              func={func}
              key={func}
              latency50={latency50}
              latency99={latency99}
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
