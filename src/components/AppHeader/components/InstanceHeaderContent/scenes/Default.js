import React from "react";
import { PropTypes } from "prop-types";

import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";

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
      <Tab href={`/explorer`} icon="Explorer" tabIndex={1} title="Explorer" />
    </TabNav>
  );
}
