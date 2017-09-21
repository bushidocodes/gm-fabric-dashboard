import { PropTypes } from "prop-types";
import React from "react";

import FunctionsTableLineItem from "./FunctionsTableLineItem";

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
    <div className="div-table routes-table">
      <div className="div-table-header">
        <div className="routes-table-route">Function</div>
        <div className="routes-table-sparkline">Requests/sec</div>
        <div className="routes-table-total-requests">Requests</div>
        <div className="routes-table-error-percent">Error %</div>
        <div className="routes-table-error-percent">Latency 50%</div>
        <div className="routes-table-error-percent">Latency 99%</div>
      </div>
      <ol className="div-table-body">
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
      </ol>
    </div>
  );
}
