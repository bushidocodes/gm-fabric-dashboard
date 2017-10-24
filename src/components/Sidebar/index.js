import { PropTypes } from "prop-types";
import React from "react";
import SidebarContainer from "./components/SidebarContainer";
import SidebarFooter from "./components/SidebarFooter";
import SidebarHeader from "./components/SidebarHeader";

import { getFabricServer } from "../../utils/head";
import UseSDS from "./scenes/UseSDS";
import NoSDS from "./scenes/NoSDS";

Sidebar.propTypes = {
  runtime: PropTypes.string
};

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
export default function Sidebar({ runtime }) {
  return (
    <SidebarContainer>
      <SidebarHeader />
      {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
      {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
      {/* index.html via the head utils */}
      {getFabricServer() ? <UseSDS /> : <NoSDS />}
      <SidebarFooter />
    </SidebarContainer>
  );
}
