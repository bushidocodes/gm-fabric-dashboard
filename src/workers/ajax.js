import registerPromiseWorker from "promise-worker/register";
import axios from "axios";

registerPromiseWorker(message => {
  switch (message.type) {
    case "fetchMetrics":
      const { runtime, endpoints } = message;
      // This block allows us to direclty poll Envoy metrics from a single source
      // Everything beyond the first endpoint is discarded
      // The data is transformed from statsd format into a flat object of key/value pairs
      if (runtime === "ENVOY") {
        return (
          axios
            .get(endpoints[0], { responseType: "text" }) // Only poll the first endpoint
            .then(response => response.data)
            // A statsd file contains key value pairs delimited by : and terminated by \n
            .then(statsdTextFile => {
              let results = {};
              statsdTextFile
                .split("\n")
                .map(kv => kv.split(": "))
                .forEach(([key, value]) => {
                  if (key) {
                    results[key] = Number(value);
                  }
                });
              return results;
            })
        );
      } else {
        return Promise.all(
          endpoints.map(endpoint =>
            axios.get(endpoint, { responseType: "json" })
          )
        )
          .then(jsons => jsons.map(json => json.data))
          .then(jsons => {
            let results = {};
            jsons.forEach(json => {
              results = { ...results, ...json };
            });
            return results;
          })
          .then(results => {
            return results;
          });
      }
    case "fetchThreads":
      const { endpoint } = message;
      return axios.get(endpoint, { responseType: "json" });
    default:
      console.log("Invalid Runtime");
  }
});
