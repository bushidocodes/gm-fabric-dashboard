import React from "react";
import { PropTypes } from "prop-types";

import Tab from "../../Tab";
import TabNav from "../../TabNav";
SidebarContent.propTypes = {
  headerTabs: PropTypes.array
};

/**
 * Default Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ headerTabs }) {
  return (
    <TabNav>
      {headerTabs}
      <Tab href={`/explorer`} icon="search" tabIndex={1} title="Explorer" />
    </TabNav>
  );
}
