import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricSidebarContent from "./scenes/Fabric";
import InstanceSidebarContent from "../../../../components/InstanceSidebarContent";

// 'new' sidebarContent that routes to FabricSidebarContent || InstanceSidebarContent

function SidebarContent() {
  return (
    <Switch>
      <Route exact path="/" render={() => <FabricSidebarContent />} />
      <Route
        path="/:serviceName/:serviceVersion/:instanceID"
        component={InstanceSidebarContent}
      />
    </Switch>
  );
}

export default withRouter(SidebarContent);
