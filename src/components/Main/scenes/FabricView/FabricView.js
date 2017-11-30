import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router";

import FabricGrid from "./components/FabricGrid";
import GMServiceView from "components/Main/scenes/ServiceView";
import generateStatusRoutes from "./utils/generateStatusRoutes";
import { decodeParameter } from "utils";
import { LazyLoader } from "components/LazyLoader";

import { computeStatus } from "utils/selectors";
import { serviceShape } from "components/PropTypes";

const InstanceRouter = LazyLoader({
  loader: () => import("components/Main/scenes/InstanceView")
});

const SettingsGrid = LazyLoader({
  loader: () => import("components/Main/components/Settings")
});

FabricView.propTypes = {
  services: serviceShape
};

/**
 * Fabric Router is an optional top-level router that only runs when the dashboard is running
 * with a backend server. It is inserted between the root container and the Instance Router
 * and injects the following additional route parameters
 *
 * serviceName - The name of the selected microservice
 * instanceID - The ID of the selected microservice instance of type serviceName
 *
 * When routes match with a serviceName and an instanceID, Fabric Router triggers the async
 * JumpState Effect selectInstance, which clears the metrics store and initiates polling of
 * the metrics endpoint associated with this instance.
 *
 * It also looks up the runtime of the selected microservice and passes it as props to the InstanceRouter
 *
 * @export
 * @returns JSX.Element
 */
function FabricView({ services }) {
  return (
    <Switch>
      <Route component={SettingsGrid} exact path="/settings" />
      <Route
        path="/:serviceName/:version/:instanceID/"
        render={({
          match: { url, params: { serviceName, version, instanceID } }
        }) => {
          serviceName = decodeParameter(serviceName);

          // baseURL is prefixed to route paths and link to attributes when running with Fabric Server
          const baseURL = url[url.length - 1] === "/" ? url.slice(0, -1) : url;

          const service =
            services && serviceName && services[`${serviceName}|${version}`]
              ? services[`${serviceName}|${version}`]
              : "";

          // Lookup the runtime of the microservice named serviceName
          // runtime informs the runtime-agnostic InstanceRouter which runtime router to render
          const runtime =
            services && serviceName && service ? service.runtime : "";

          // Check if our services object has been passed to the router
          const servicesAreNotLoaded = !Object.keys(services).length;

          // Set our authorization booleans
          const userIsAuthorized = service.authorized;
          const serviceIsMetered = service.metered;
          const serviceIsValid = service;
          // Check our instanceID against this services' instances
          const instanceIsValid =
            service &&
            service.instances.some(obj => {
              return obj.name === instanceID;
            });

          // Set a message to pass to location state if one of the following checks fail
          let message,
            pathname = "/";

          // Checks are ordered by priority of the message
          if (!serviceIsValid) {
            message = `${serviceName} ${version} is not a known microservice`;
          } else if (!userIsAuthorized) {
            message = `You are not authorized to view ${serviceName} ${
              version
            }`;
          } else if (!instanceIsValid) {
            // If isValidInstance is false, also set a pathname that will redirect to the service view
            message = `${instanceID} is not a known instance of ${
              serviceName
            } ${version}`;
            pathname = `/${serviceName}/${version}`;
          } else if (!serviceIsMetered) {
            message = `${serviceName} does not have metrics to display`;
          }

          // If the services object has not been passed to the router yet,
          // or if the user is authorized and the service exists and is metered
          // then render the instance router, else redirect with error message
          return servicesAreNotLoaded ||
            (userIsAuthorized &&
              serviceIsMetered &&
              serviceIsValid &&
              instanceIsValid) ? (
            <InstanceRouter
              runtime={runtime}
              baseURL={baseURL}
              serviceName={serviceName}
              serviceVersion={version}
              instanceID={instanceID}
            />
          ) : (
            <Redirect
              to={{
                pathname: pathname,
                state: {
                  message
                }
              }}
            />
          );
        }}
      />

      {/* Utility function that generates Routes for /down, /warning, and /stable */}
      {generateStatusRoutes(services)}

      {/* Just Redirect back to the services page if an instance ID isn't found*/}
      <Route
        exact
        path="/:serviceName/"
        render={({ location: { pathname } }) => {
          // Blacklist known top level routes in render just in case.
          // Since we're in a switch and this route is last, this shouldn't be needed
          if (pathname !== "/settings") {
            return <Redirect to={`/`} />;
          }
        }}
      />
      <Route
        exact
        path="/:serviceName/:version/"
        render={({ match: { params: { serviceName, version } }, ...props }) => {
          serviceName = decodeParameter(serviceName);
          const service =
            services && serviceName && services[`${serviceName}|${version}`]
              ? services[`${serviceName}|${version}`]
              : "";
          const instances = (service && service.instances) || [];
          const status = computeStatus(
            instances.length,
            service.minimum,
            service.maximum
          );

          // Check if our services object has been passed to the router
          const servicesAreNotLoaded = !Object.keys(services).length;

          // Set our authorization booleans
          const userIsAuthorized = service.authorized;
          const serviceIsMetered = service.metered;
          const serviceIsValid = service;

          // Set a message to pass to location state if one of the following checks fail
          let message;
          // Checks are ordered by priority of the message
          if (!serviceIsValid) {
            message = `${serviceName} ${version} is not a known microservice`;
          } else if (!userIsAuthorized) {
            message = `You are not authorized to view ${serviceName} ${
              version
            }`;
          } else if (!serviceIsMetered) {
            message = `${serviceName} does not have metrics to display`;
          }

          // If the services object has not been passed to the router yet,
          // or if the user is authorized and the service exists and is metered
          // then render the instance router, else redirect with error message
          return servicesAreNotLoaded ||
            (userIsAuthorized && serviceIsMetered && serviceIsValid) ? (
            <GMServiceView
              {...props}
              serviceName={serviceName}
              serviceVersion={version}
              instances={instances}
              status={status}
            />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { message }
              }}
            />
          );
        }}
      />
      {/* For the route route, mount the Fabric Grid, the element used to depict an entire Fabric of microservices*/}
      <Route
        exact
        path="/"
        render={props => {
          return <FabricGrid {...props} services={_.values(services)} />;
        }}
      />
    </Switch>
  );
}

function mapStateToProps(state) {
  return { services: state.fabric.services };
}

// We wrap with the withRouter HOC because we need to force this component to rerender on every route change
export default withRouter(connect(mapStateToProps)(FabricView));
