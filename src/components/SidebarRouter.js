import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import SidebarServices from "./SidebarServices";
import SidebarInstance from "./SidebarInstance";

/**
 * Subrouter for Sidebar
 * @param {*} props 
 */
function SidebarRouter(props) {
  return (
    <Switch>
      <Route path="/:serviceName/:instanceID/" component={SidebarInstance} />
      <Route exact path="/" component={SidebarServices} />
    </Switch>
  );
}

export default withRouter(SidebarRouter);
