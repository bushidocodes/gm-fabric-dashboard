import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricAppHeaderContent from "./scenes/Fabric";
import InstanceHeaderContent from "../../components/InstanceHeaderContent";
import ServiceHeaderContent from "./scenes/Service";

function AppHeaderContent() {
  return (
    <Switch>
      {/* Match on root and stable, down, or warning */}
      <Route
        path="/:path(|stable|down|warning)"
        component={FabricAppHeaderContent}
      />
      <Route
        exact
        path="/:serviceName/:serviceVersion"
        component={ServiceHeaderContent}
      />
      <Route
        path="/:serviceName/:serviceVersion/:instanceID"
        component={InstanceHeaderContent}
      />
    </Switch>
  );
}

export default withRouter(AppHeaderContent);
