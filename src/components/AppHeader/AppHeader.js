import React from "react";
import { withRouter } from "react-router-dom";

import AppHeaderContainer from "./components/AppHeaderContainer";
import AppToolBar from "./components/AppToolBar";
import Banner from "./components/Banner";
import AppHeaderContent from "./scenes";
import InstanceHeaderContent from "./scenes/InstanceHeaderContent";

import { getFabricServer } from "utils/head";
import { decodeParameter, trimID } from "utils";
import { routerLocationShape } from "components/PropTypes";

AppHeader.propTypes = {
  location: routerLocationShape
};
/**
 * Stateless functional React component that renders the App Header
 * @returns JSX.Element
 */
function AppHeader({ location: { pathname } }) {
  return (
    <AppHeaderContainer>
      <AppToolBar pathname={pathname} />
      <Banner title={getTitle(pathname)} hideBackground={false} />
      {getFabricServer() ? <AppHeaderContent /> : <InstanceHeaderContent />}
    </AppHeaderContainer>
  );
}

function getTitle(pathname) {
  const [root, version = "", instance = ""] = decodeParameter(pathname)
    .replace(/^\/|\/$/g, "")
    .replace("%2F", "/") // String out escaped slashes if found
    .split("/");

  // If there is an instance in the path, display root : version: instance
  // If not, then check if the root is truthy and display that
  // Else just display Fabric
  if (instance) {
    return `${root} : ${version} : ${trimID(instance)}`;
  } else if (root) {
    return root;
  } else {
    return "Fabric";
  }
}

export default withRouter(AppHeader);
