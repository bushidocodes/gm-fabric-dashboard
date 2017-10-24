import { PropTypes } from "prop-types";
import React from "react";

import SidebarNavWidgetTemplate from "../../../components/SidebarNavWidget";

import { getBackButtonUrl } from "../../../../../utils/head";

SidebarNavWidget.propTypes = {
  history: PropTypes.object,
  services: PropTypes.object
};

/**
 * Sidebar Nav Component for GM Fabric Dashboard running with Fabric Server and monitoring
 * a single instance
 * 
 * @param {any} { services } 
 * @returns JSX.Element
 */

function SidebarNavWidget({ services }) {
  const parentPath = getBackButtonUrl();
  if (parentPath) {
    return (
      <SidebarNavWidgetTemplate
        parent={{ name: "Fabric", path: parentPath }}
        parentPathIsExternal={true}
      />
    );
  } else return "";
}

export default SidebarNavWidget;
