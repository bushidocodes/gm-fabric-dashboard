import { PropTypes } from "prop-types";
import React from "react";
import { getFabricServer } from "../../utils/head";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AppHeaderContainer from "./components/AppHeaderContainer";
import AppToolBar from "./components/AppToolBar";
import Banner from "./components/Banner";
import UseSDS from "./scenes/UseSDS";
import NoSDS from "./scenes/NoSDS";

Header.propTypes = {
  location: PropTypes.object,
  selectedInstance: PropTypes.string,
  selectedService: PropTypes.string
};
/**
 * Stateless functional React component that renders the App Header
 * @returns JSX.Element
 */
function Header({ location: { pathname }, selectedService, selectedInstance }) {
  return (
    <AppHeaderContainer>
      <AppToolBar pathname={pathname} />
      <Banner
        title={getTitle(pathname, selectedService, selectedInstance)}
        hideBackground={false}
      />
      {getFabricServer() ? <UseSDS /> : <NoSDS />}
    </AppHeaderContainer>
  );
}

function getTitle(pathname, selectedService, selectedInstance) {
  // This will display the first item in the path
  // Else if we are on an instance, it will display serviceName : last 8 digits of instanceID
  // If the path is on the root, display Fabric
  const path = pathname
    .replace(/^\/|\/$/g, "")
    .replace("%2F", "/") // String out escaped slashes if found
    .split("/");

  // If the selected Instance matches what's in our path, then display it, else return an empty string
  let instance = selectedInstance === path[2] ? ` : ${path[2].substr(-8)}` : "";

  return path[0] ? `${path[0]} ${instance}` : "Fabric";
}

function mapStateToProps(state) {
  return {
    selectedService: state.settings.selectedService,
    selectedInstance: state.settings.selectedInstance
  };
}

export default withRouter(connect(mapStateToProps)(Header));
