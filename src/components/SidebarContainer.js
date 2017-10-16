import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SidebarContent from "./SidebarContent";
import InstanceSidebarContent from "./instance/SidebarContent";
import Sidebar from "./Sidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import FabricSidebarNavWidget from "./fabric/SidebarNavWidget";
import InstanceSidebarNavWidget from "./instance/SidebarNavWidget";
import { SummaryBar } from "./SummaryBar";

import { getFabricServer } from "../utils/head";

SidebarContainer.propTypes = {
  runtime: PropTypes.string
};

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
function SidebarContainer({ runtime }) {
  return (
    <Sidebar>
      <SidebarHeader />
      {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
      {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
      {/* index.html via the head utils */}
      {getFabricServer() ? (
        <SummaryBar>
          <FabricSidebarNavWidget />
          <SidebarContent />
        </SummaryBar>
      ) : (
        <SummaryBar>
          <InstanceSidebarNavWidget />
          <InstanceSidebarContent runtime={runtime} />
        </SummaryBar>
      )}
      <SidebarFooter />
    </Sidebar>
  );
}

function mapStateToProps({ settings: { runtime } }) {
  return { runtime };
}

export default withRouter(connect(mapStateToProps)(SidebarContainer));
