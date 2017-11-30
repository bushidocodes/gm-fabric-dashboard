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

// Dashboard Chart
const dychartTimeseriesPointShape = PropTypes.shape({
  attribute: PropTypes.string.isRequred,
  baseUnit: PropTypes.string,
  label: PropTypes.string.isRequred,
  precision: PropTypes.number,
  resultUnit: PropTypes.string,
  type: PropTypes.string.isRequred,
  value: PropTypes.string
});
const gmLineChartShape = PropTypes.shape({
  data: PropTypes.shape({
    timeseries: PropTypes.arrayOf(dychartTimeseriesPointShape)
  }),
  title: PropTypes.string,
  type: PropTypes.string.isRequred
});
const gmBasicMetricsChartShape = PropTypes.shape({
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  title: PropTypes.string,
  type: PropTypes.string.isRequred
});

const gmTableChartShape = PropTypes.shape({
  data: {
    headers: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  },
  title: PropTypes.string,
  type: PropTypes.string.isRequred
});

const dashboardLayoutItemShape = PropTypes.shape({
  h: PropTypes.number.isRequred,
  i: PropTypes.string.isRequred,
  minH: PropTypes.number.isRequred,
  minW: PropTypes.number.isRequred,
  w: PropTypes.number.isRequred,
  x: PropTypes.number.isRequred,
  y: PropTypes.number.isRequred
});

const gridShape = PropTypes.shape({
  breakpoints: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number
  }),
  cols: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number
  }),
  layouts: PropTypes.shape({
    lg: PropTypes.arrayOf(dashboardLayoutItemShape),
    md: PropTypes.arrayOf(dashboardLayoutItemShape),
    sm: PropTypes.arrayOf(dashboardLayoutItemShape)
  }),
  rowHeight: PropTypes.number
});

export const dashboardShape = PropTypes.shape({
  charts: PropTypes.arrayOf(
    PropTypes.oneOfType([
      gmLineChartShape,
      gmBasicMetricsChartShape,
      gmTableChartShape
    ])
  ),
  grid: gridShape,
  name: PropTypes.string,
  runtime: PropTypes.string,
  summaryCard: PropTypes.shape({
    icon: PropTypes.string,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.arrayOf(
          PropTypes.shape({
            baseUnit: PropTypes.string,
            precision: PropTypes.number,
            resultUnit: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string
          })
        )
      })
    )
  })
});

export const threadsTableItemShape = PropTypes.shape({
  daemon: PropTypes.bool,
  name: PropTypes.string,
  priority: PropTypes.number,
  stack: PropTypes.arrayOf(PropTypes.string),
  state: PropTypes.string
});

export const serviceItemShape = PropTypes.shape({
  authorized: PropTypes.bool,
  docsLink: PropTypes.string,
  headerTitle: PropTypes.string,
  instances: PropTypes.arrayOf(serviceInstanceShape),
  metered: PropTypes.bool,
  name: PropTypes.string,
  runtime: PropTypes.string,
  status: PropTypes.string,
  version: PropTypes.string
});
