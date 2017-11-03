import { PropTypes } from "prop-types";
import React from "react";

import ThreadsTableLineItem from "./components/ThreadsTableLineItem";

import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableBody from "components/Main/components/TableBody";

import TableColHeaderThread from "components/Main/components/TableColHeaderThread";
import TableColHeader from "components/Main/components/TableColHeader";

import TableColDaemon from "components/Main/components/TableColDaemon";

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
    <Table>
      <TableHeader>
        <TableColHeaderThread paddingLeft>ID</TableColHeaderThread>
        <TableColHeaderThread style={{ textAlign: "center" }}>
          State
        </TableColHeaderThread>
        <TableColHeaderThread>Trace</TableColHeaderThread>
        <TableColHeader style={{ flex: "1 1 auto" }}>Name</TableColHeader>
        <TableColDaemon header>Daemon</TableColDaemon>
        <TableColDaemon header>Priority</TableColDaemon>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  );
}
