import React from "react";

import TableHeader from "components/Main/components/TableHeader";
import TableColHeaderThread from "components/Main/components/TableColHeaderThread";
import TableColHeader from "components/Main/components/TableColHeader";
import TableColDaemon from "components/Main/components/TableColDaemon";

/**
 * Stateless functional component that renders threads header columns
 * @returns JSX.Element
 */

export default function ThreadsTableHeader() {
  return (
    <TableHeader>
      <TableColHeaderThread>ID</TableColHeaderThread>
      <TableColHeaderThread style={{ textAlign: "center" }}>
        State
      </TableColHeaderThread>
      <TableColHeaderThread>Trace</TableColHeaderThread>
      <TableColHeader style={{ flex: "1 1 auto" }}>Name</TableColHeader>
      <TableColDaemon header>Daemon</TableColDaemon>
      <TableColDaemon header>Priority</TableColDaemon>
    </TableHeader>
  );
}
