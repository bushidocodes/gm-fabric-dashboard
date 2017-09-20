import registerPromiseWorker from "promise-worker/register";
import axios from "axios";
import _ from "lodash";
import { formatStatsd } from "./ajaxUtils";

// Register with Promise-Worker
registerPromiseWorker(message => main(message));

// Main function of promise externalized to make unit tests easier
export function main(message) {
  switch (message.type) {
    case "fetchServices":
      if (message.fabricServer) {
        return axios
          .get(`${message.fabricServer}/services`, { responseType: "json" })
          .then(response => response.data)
          .then(arrayOfServices =>
            arrayOfServices.reduce((result, service) => {
              result[`${service.name}|${service.version}`] = service;
              return result;
            }, {})
          );
      } else {
        return Promise.reject("Invalid endpoint");
      }
    case "fetchMetricsWithServer":
      if (!message.fabricServer)
        return Promise.reject("Missing Fabric Server Endpoint");
      if (!message.service) return Promise.reject("Missing Service Name");
      if (!message.version) return Promise.reject("Missing Service Version");
      if (!message.instanceID) return Promise.reject("Missing Instance ID");
      return (
        axios
          .get(
            `${message.fabricServer}/metrics/${message.service}/${message.version}/${message.instanceID}`
          )
          .then(response => response.data)
          // Cast all values to numerics and filter out NaNs
          .then(data => _.mapValues(data, value => Number(value)))
          .then(data => _.omitBy(data, value => Number.isNaN(value)))
      );
    case "fetchMetricsWithoutServer":
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
    case "fetchThreadsFromServer":
      if (!message.serverEndpoint)
        return Promise.reject("Missing endpoint of Fabric Server");
      if (!message.instanceID) return Promise.reject("Missing Instance ID");
      return axios.get(
        `${message.serverEndpoint}/threads/${message.instanceId}`
      );
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
