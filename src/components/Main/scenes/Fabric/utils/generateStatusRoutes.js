import React from "react";
import { Route } from "react-router";
import _ from "lodash";

import { microserviceStatuses } from "../../../../../utils/constants";
import FabricGrid from "../FabricGrid";
import { computeStatus } from "../../../../../utils/selectors";

/** HOC that loops through microserviceStatuses and generates routes,
* passing the filtered services to FabricGrid
* @export
* @returns JSX.Element
**/

function generateStatusRoutes(services) {
  return microserviceStatuses.map(route => {
    route = route.toLowerCase();
    return (
      <Route
        exact
        key={`/${route}`}
        path={`/${route}`}
        render={() => {
          return (
            <FabricGrid
              services={_.values(services).filter(service => {
                let status = computeStatus(
                  service.instances.length,
                  service.minimum,
                  service.maximum
                );
                return status.toLowerCase() === route;
              })}
            />
          );
        }}
      />
    );
  });
}
export default generateStatusRoutes;
