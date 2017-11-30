import { PropTypes } from "prop-types";

// Metrics Shape
// The only predictable key in a metrics onbject is the timestamps key
export const metricsShape = PropTypes.shape({
  timestamps: PropTypes.arrayOf(PropTypes.string)
});

// React Router Location Shape
// Based on https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md
export const routerLocationShape = PropTypes.shape({
  hash: PropTypes.string.isRequred,
  key: PropTypes.string, // Only present for Browser History Router
  pathname: PropTypes.string.isRequred,
  search: PropTypes.string.isRequred,
  state: PropTypes.object
});

// getStatusCount Results Shape

// Button Style Shape

// React Router History Shape
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
export const routerHistoryShape = PropTypes.shape({
  action: PropTypes.string.isRequred,
  block: PropTypes.func.isRequred,
  createHref: PropTypes.func.isRequred,
  go: PropTypes.func.isRequred,
  goBack: PropTypes.func.isRequred,
  goForward: PropTypes.func.isRequred,
  length: PropTypes.number.isRequred,
  listen: PropTypes.func.isRequred,
  location: routerLocationShape.isRequred,
  push: PropTypes.func.isRequred,
  replace: PropTypes.func.isRequred
});
// React Router Match Shape
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md
export const routerMatchShape = PropTypes.shape({
  isExact: PropTypes.bool.isRequred,
  params: PropTypes.object.isRequred,
  path: PropTypes.string.isRequred,
  url: PropTypes.string.isRequred
});

// Dashboard shape

// Readout Item Container Style Shape

// Readout Items Style Shape

// Readout Items Value Shape

// Instance Object
export const serviceInstanceShape = PropTypes.shape({
  name: PropTypes.string.isRequred,
  start_time: PropTypes.number.isRequred
});

// Fabric Services Object
// from state.fabric.services
export const serviceShape = PropTypes.shape({
  authorized: PropTypes.bool.isRequred,
  capability: PropTypes.string.isRequred,
  documentation: PropTypes.string.isRequred,
  instances: PropTypes.oneOfType([
    PropTypes.arrayOf(serviceInstanceShape),
    PropTypes.array
  ]),
  maximum: PropTypes.number.isRequred,
  metered: PropTypes.bool.isRequred,
  minimum: PropTypes.number.isRequred,
  name: PropTypes.string.isRequred,
  owner: PropTypes.string.isRequred,
  runtime: PropTypes.string.isRequred,
  threaded: PropTypes.bool.isRequred,
  version: PropTypes.string.isRequred
});

// Array of { headerTitle, name, version, docsLink, status }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// status: string equal to "Stable", "Warning", or "Down"
