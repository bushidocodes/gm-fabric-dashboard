import registerPromiseWorker from "promise-worker/register";
import axios from "axios";
import _ from "lodash";

registerPromiseWorker(message => {
  switch (message.type) {
    case "fetchMetrics":
      // This block allows us to direclty poll Envoy metrics from a single source
      // Everything beyond the first endpoint is discarded
      // The data is transformed from statsd format into a flat object of key/value pairs
      if (message.runtime === "ENVOY") {
        return (
          axios
            .get(message.endpoint, { responseType: "text" }) // Only poll the first endpoint
            .then(response => response.data)
            // A statsd file contains key value pairs delimited by : and terminated by \n
            .then(statsdTextFile => {
              let results = {};
              statsdTextFile
                .split("\n")
                .map(kv => kv.split(": "))
                .forEach(([key, value]) => {
                  if (key && value) {
                    // Cast to a number and filter out NaNs
                    const valueAsNumber = Number(value);
                    if (!Number.isNaN(valueAsNumber)) {
                      results[key] = Number(value);
                    }
                  }
                });
              return results;
            })
        );
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
    case "fetchThreads":
      return axios
        .get(message.endpoint, { responseType: "json" })
        .then(response => {
          // If the endpoint returns a non-json response, then we can have a
          // successful response code without any usable data.
          if (!response.data) {
            return Promise.reject(
              "The data object didn't contain JSON as expected"
            );
          } else {
            return response;
          }
        });
    default:
      console.log("Invalid Message");
  }
});
