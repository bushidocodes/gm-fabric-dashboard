import React from "react";
import { PropTypes } from "prop-types";

import SidebarCard from "../../SidebarCard";

SidebarContent.propTypes = {
  sidebarCards: PropTypes.array
};

/**
 * Default Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ sidebarCards }) {
  return (
    <div>
      {sidebarCards}
      <SidebarCard
        href={`/explorer`}
        icon="search"
        tabIndex={1}
        title="Explorer"
      />
    </div>
  );
}
