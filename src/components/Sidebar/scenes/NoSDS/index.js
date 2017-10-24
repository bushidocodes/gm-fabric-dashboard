import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SummaryBar from "../../components/SummaryBar";

import InstanceSidebarContent from "../../components/InstanceSidebarContent";
import InstanceSidebarNavWidget from "./components/SidebarNavWidget";

Sidebar.propTypes = {
  runtime: PropTypes.string
};

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
function Sidebar({ runtime }) {
  return (
    <SummaryBar>
      <InstanceSidebarNavWidget />
      <InstanceSidebarContent runtime={runtime} />
    </SummaryBar>
  );
}

function mapStateToProps({ settings: { runtime } }) {
  return { runtime };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
