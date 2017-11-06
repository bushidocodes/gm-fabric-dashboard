import axios from "axios";
import _ from "lodash";
import { formatStatsd } from "./utils";

// AJAX Calls to APIs
export function fetchInstanceMetrics(endpoint) {
  return (
    axios
      .get(endpoint, { responseType: "json" })
      .then(response => response.data)
      // Cast all values to numerics and filter out NaNs
      .then(data => _.mapValues(data, value => Number(value)))
      .then(data => _.omitBy(data, value => Number.isNaN(value)))
  );
}

export function fetchEnvoySidecarMetrics(endpoint) {
  // This block allows us to directly poll Envoy metrics
  // The data is transformed from statsd format into a flat object of key/value pairs
  return axios
    .get(endpoint, { responseType: "text" })
    .then(response => response.data)
    .then(statsdText => formatStatsd(statsdText));
}
