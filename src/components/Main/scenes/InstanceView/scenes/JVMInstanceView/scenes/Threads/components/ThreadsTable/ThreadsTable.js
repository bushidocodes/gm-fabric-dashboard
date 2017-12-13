import { PropTypes } from "prop-types";
import React from "react";
import _ from "lodash";

import ThreadsTableHeader from "./components/ThreadsTableHeader";
import ThreadsList from "./components/ThreadsList";
import ThreadsTableStatusHeader from "./components/ThreadsTableStatusHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableDisplay from "components/Main/components/TableDisplay";
import { threadStates } from "utils/constants";

ThreadsTable.propTypes = {
  filteredThreadData: PropTypes.array,
  groupByAttribute: PropTypes.string
};

ThreadsTable.defaultProps = {
  filteredThreadData: [],
  groupByAttribute: "none"
};

/**
 * Renders a table and appropriate headers based on the provided thread data
 * @export
 * @param {Object[]} { filteredThreadData = [] }
 * @param {string} { groupByAttribute = "none" }
 * @returns JSX.Element
 */

export default function ThreadsTable({ filteredThreadData, groupByAttribute }) {
  // If we are grouping threads by state, we need to render headers

  if (groupByAttribute === "state") {
    // Add a header property to each thread object
    // based on its state so that they can be grouped
    const mappedThreads = filteredThreadData.map(thread => {
      return {
        ...thread,
        header: getHeader(thread, groupByAttribute)
      };
    });

    // Create an object with keys matching headers
    // and values being an array of corresponding thread objects
    const dataGroupedByHeader = _.groupBy(
      mappedThreads,
      thread => thread.header
    );

    // Loop through thread states to preserve the order stopped, idle, active
    // only include headers that have corresponding threads
    let headers = threadStates.filter(
      header => !_.isEmpty(dataGroupedByHeader[header])
    );

    return (
      <TableDisplay>
        <ThreadsTableHeader />
        {headers.map((header, idx) => [
          <ThreadsTableStatusHeader key={`header|${header}|${idx}`}>
            <TableColHeader>{header}</TableColHeader>
          </ThreadsTableStatusHeader>,
          <ThreadsList
            threads={dataGroupedByHeader[header]}
            key={`list|${header}|${idx}`}
          />
        ])}
      </TableDisplay>
    );
  } else {
    return (
      <TableDisplay>
        <ThreadsTableHeader />
        <ThreadsList threads={filteredThreadData} />
      </TableDisplay>
    );
  }
}

function getHeader(thread, groupByAttribute) {
  switch (thread.state) {
    case "RUNNABLE":
      return "Active";
    case "WAITING":
    case "TIMED_WAITING":
      return "Idle";
    case "TERMINATED":
    case "BLOCKED":
    case "NEW":
      return "Stopped";
    case "None":
    default:
      return "none";
  }
}
