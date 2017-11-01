import React, { Component } from "react";
import { PropTypes } from "prop-types";

import SidebarContainer from "./components/SidebarContainer";
import SidebarFooter from "./components/SidebarFooter";
import SidebarHeader from "./components/SidebarHeader";
import UseSDS from "./scenes/UseSDS";
import NoSDS from "./scenes/NoSDS";

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
export default class Sidebar extends Component {
  static propTypes = {
    fabricServer: PropTypes.string.isRequired
  };
  render() {
    return (
      <SidebarContainer>
        <SidebarHeader />
        {/* If running with a Fabric Server, load Fabric Router. Otherwise just directly load */}
        {/* InstanceRouter and pass the runtime value defined in Redux and populated from */}
        {/* index.html via the head utils */}
        {this.props.fabricServer ? <UseSDS /> : <NoSDS />}
        <SidebarFooter />
      </SidebarContainer>
    );
  }
}
