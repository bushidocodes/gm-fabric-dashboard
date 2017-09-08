import React from "react";
import { PropTypes } from "prop-types";

import SidebarCard from "../SidebarCard";

SidebarContent.propTypes = {
  sidebarCards: PropTypes.array
};

/**
 * Golang Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ sidebarCards }) {
  return (
    <div>
      <SidebarCard href={`/summary`} icon="star" tabIndex={1} title="Summary" />
      {sidebarCards}
      <SidebarCard
        href={`/explorer`}
        icon="search"
        tabIndex={8}
        title="Explorer"
      />
    </div>
  );
}
