import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricAppHeaderContent from "./components/scenes/Fabric";
import InstanceHeaderContent from "../../components/InstanceHeaderContent";

// Add a route for /:serviceName/:serviceVersion

function AppHeaderContent() {
  return (
    <Switch>
      {/* Match on root and stable, down, or warning */}
      <Route
        path="/:path(|stable|down|warning)"
        component={FabricAppHeaderContent}
      />
      <Route
        path="/:serviceName/:serviceVersion/:instanceID"
        component={InstanceHeaderContent}
      />
    </Switch>
  );
}

export default withRouter(AppHeaderContent);
