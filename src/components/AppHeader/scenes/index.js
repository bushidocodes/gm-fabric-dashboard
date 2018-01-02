import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import FabricAppHeaderContent from "./FabricHeaderContent";
import InstanceHeaderContent from "./InstanceHeaderContent";
import ServiceHeaderContent from "./ServiceHeaderContent";

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
