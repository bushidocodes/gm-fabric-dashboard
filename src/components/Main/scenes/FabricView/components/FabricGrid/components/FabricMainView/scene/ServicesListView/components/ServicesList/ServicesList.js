import React from "react";
import { PropTypes } from "prop-types";

import ServicesListItem from "./components/ServicesListItem";
import SectionItems from "./components/SectionItems";

/**
 * Render section(s) with grouping header and group of lists
 *
 */

ServicesList.propTypes = {
  groupByAttribute: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default function ServicesList({ items, groupByAttribute }) {
  return (
    <SectionItems>
      {items.map(item => (
        <ServicesListItem
          authorized={item.authorized}
          metered={item.metered}
          key={`${item.name}${item.version}`}
          instances={item.instances}
          name={item.name}
          runtime={item.runtime}
          status={item.status}
          version={item.version}
          docsLink={item.docsLink}
          groupByAttribute={groupByAttribute}
        />
      ))}
    </SectionItems>
  );
}
