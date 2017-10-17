import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router";

import FabricGrid from "./FabricGrid";
import GMServiceView from "../library/GMServiceView";
import InstanceRouter from "../instance/InstanceRouter";
import SettingsGrid from "../SettingsGrid";
import { computeStatus } from "../../utils/selectors";

FabricRouter.propTypes = {
  services: PropTypes.object
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
function FabricRouter({ services }) {
  return (
    <Switch>
      <Route component={SettingsGrid} exact path="/settings" />
      <Route
        path="/:serviceName/:version/:instanceID/"
        render={({
          match: { url, params: { serviceName, version, instanceID } }
        }) => {
          const baseURL = url[url.length - 1] === "/" ? url.slice(0, -1) : url;

          // Lookup the runtime of the microservice named serviceName
          const runtime =
            services && serviceName && services[`${serviceName}|${version}`]
              ? services[`${serviceName}|${version}`].runtime
              : "";
          // runtime informs the runtime-agnostic InstanceRouter which runtime router to render
          // baseURL is prefixed to route paths and link to attributes when running with Fabric Server
          return (
            <InstanceRouter
              runtime={runtime}
              baseURL={baseURL}
              serviceName={serviceName}
              serviceVersion={version}
              instanceID={instanceID}
            />
          );
        }}
      />
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
        render={({ match: { params: { serviceName, version } } }) => {
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

          return (
            <GMServiceView
              serviceName={serviceName}
              serviceVersion={version}
              instances={instances}
              status={status}
            />
          );
        }}
      />
      {/* For the route route, mount the Fabric Grid, the element used to depict an entire Fabric of microservices*/}
      <Route exact path="/" component={FabricGrid} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return { services: state.fabric.services };
}

// We wrap with the withRouter HOC because we need to force this component to rerender on every route change
export default withRouter(connect(mapStateToProps)(FabricRouter));
