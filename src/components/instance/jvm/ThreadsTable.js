import { PropTypes } from "prop-types";
import React from "react";

import ThreadsTableLineItem from "./ThreadsTableLineItem";

ThreadsTable.propTypes = {
  filteredThreadData: PropTypes.array
};

/**
 * Table of threads containing a header and 0..n lineitems
 * @export
 * @param {any} { filteredThreadData = [] } 
 * @returns JSX.Element
 */
export default function ThreadsTable({ filteredThreadData = [] }) {
  return (
    <div className="div-table thread-table">
      <div className="div-table-header thread-table-header">
        <div className="thread-table-id">ID</div>
        <div className="thread-table-state">State</div>
        <div className="thread-table-stacktrace">Trace</div>
        <div className="thread-table-name">Name</div>
        <div className="thread-table-daemon">Daemon</div>
        <div className="thread-table-priority">Priority</div>
      </div>
      <ol className="div-table-body thread-table-body">
        {filteredThreadData.map(
          ({ daemon, id, name, priority, stack, state }, arrIndex) => {
            return (
              <ThreadsTableLineItem
                {...{ daemon, name, priority, stack, state }}
                arrIndex={arrIndex}
                id={Number(id)}
                key={id}
              />
            );
          }
        )}
      </ol>
    </div>
  );
}
