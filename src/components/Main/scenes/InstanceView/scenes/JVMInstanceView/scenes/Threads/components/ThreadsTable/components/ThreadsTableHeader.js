import React from "react";

import TableHeader from "components/Main/components/TableHeader";
import TableColHeaderThread from "components/Main/components/TableColHeaderThread";
import TableColHeader from "components/Main/components/TableColHeader";

/**
 * Stateless functional component that renders threads header columns
 * @returns JSX.Element
 */

// last empty column is placeholder for thread icon
export default function ThreadsTableHeader() {
  return (
    <TableHeader>
      <TableColHeaderThread style={{ textAlign: "center" }}>
        State
      </TableColHeaderThread>
      <TableColHeaderThread style={{ textAlign: "center" }}>
        ID
      </TableColHeaderThread>
      <TableColHeader>Name</TableColHeader>
      <TableColHeaderThread style={{ textAlign: "right", flex: "0 1 7em" }}>
        Daemon
      </TableColHeaderThread>
      <TableColHeaderThread style={{ textAlign: "right", flex: "0 1 7em" }}>
        Priority
      </TableColHeaderThread>
      <TableColHeaderThread />
    </TableHeader>
  );
}
