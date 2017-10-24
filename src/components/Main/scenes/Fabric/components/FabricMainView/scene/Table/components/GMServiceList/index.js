import React from "react";
import { PropTypes } from "prop-types";

import GMServiceListItem from "./components/GMServiceListItem";
import SectionItems from "./components/SectionItems";

/**
 * Render section(s) with grouping header and group of lists
 *
 */

GMServiceList.propTypes = {
  groupByAttribute: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default function GMServiceList({ items, groupByAttribute }) {
  return (
    <SectionItems>
      {items.map(item => (
        <GMServiceListItem
          key={`${item.name}${item.version}`}
          instances={item.instances}
          name={item.name}
          status={item.status}
          version={item.version}
          docsLink={item.docsLink}
          groupByAttribute={groupByAttribute}
        />
      ))}
    </SectionItems>
  );
}
