import registerPromiseWorker from "promise-worker/register";
import axios from "axios";
import _ from "lodash";
import { formatStatsd } from "./ajaxUtils";

// Register with Promise-Worker
registerPromiseWorker(message => main(message));

// Main function of promise externalized to make unit tests easier
export function main(message) {
  switch (message.type) {
    case "fetchMetrics":
      // This block allows us to directly poll Envoy metrics
      // The data is transformed from statsd format into a flat object of key/value pairs
      if (message.runtime === "ENVOY") {
        return axios
          .get(message.endpoint, { responseType: "text" })
          .then(response => response.data)
          .then(statsdText => formatStatsd(statsdText));
      } else {
        return (
          axios
            .get(message.endpoint, { responseType: "json" })
            .then(response => response.data)
            // Cast all values to numerics and filter out NaNs
            .then(data => _.mapValues(data, value => Number(value)))
            .then(data => _.omitBy(data, value => Number.isNaN(value)))
        );
      }
    // Temporaryily commented out pending further commit
    // } else if (runtime === "GOLANG") {
    // } else {
    //   return Promise.all(
    //     endpoints.map(endpoint =>
    //       axios.get(endpoint, { responseType: "json" })
    //     )
    //   )
    //     .then(jsons => jsons.map(json => json.data))
    //     .then(jsons => {
    //       let results = {};
    //       jsons.forEach(json => {
    //         results = { ...results, ...json };
    //       });
    //       return results;
    //     })
    //     .then(results => {
    //       return results;
    //     });
    // }
    case "fetchThreads":
      return axios
        .get(message.endpoint, { responseType: "json" })
        .then(response => {
          // The response should have provided JSON, which Axios unpacks auto-magically
          // to an object. We need to manually reject the promise if this didn't happen
          // as expected.
          if (!response.data || typeof response.data !== "object") {
            return Promise.reject(
              "The data object didn't contain JSON as expected"
            );
          } else {
            return response.data;
          }
        });
    default:
      return Promise.reject("Invalid Message");
  }
}
