import React from "react";
import PropTypes from "prop-types";

import TableBody from "components/Main/components/TableBody";
import ThreadsTableLineItem from "./ThreadsTableLineItem";

ThreadsList.propTypes = {
  threads: PropTypes.array.isRequired
};

/**
 * Parent component that renders ThreadsTableLineItems
 * @export
 * @param {Object[]} { threads }
 * @returns JSX.Element
 */

export default function ThreadsList({ threads }) {
  return (
    <TableBody>
      {threads.map(({ daemon, id, name, priority, stack, state, header }) => {
        return (
          <ThreadsTableLineItem
            {...{ daemon, name, priority, stack, state }}
            id={Number(id)}
            key={id}
          />
        );
      })}
    </TableBody>
  );
}
