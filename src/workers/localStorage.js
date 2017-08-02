import registerPromiseWorker from "promise-worker/register";
import localforage from "localforage";
import _ from "lodash";
import defaultJVMDashboards from "../json/jvmDashboards.json";

registerPromiseWorker(message => {
  switch (message.type) {
    case "init":
      const { basename } = message;
      return localforage.config({
        name: `grey-matter-fabric-${basename}`,
        description:
          "Persistent storage of Grey Matter Fabric dashboards and settings"
      });
    case "getDashboards":
      const { runtime } = message;
      return localforage
        .getItem("dashboards")
        .then(savedDashboards => {
          console.log("dashbaords:", savedDashboards);
          if (
            savedDashboards &&
            _.every(savedDashboards, dashboard => dashboard.runtime === runtime)
          ) {
            return savedDashboards;
          } else {
            return setDashboardsToDefault();
          }
        })
        .catch(err => console.log("fetchDashboards failed with ", err));
    case "setDashboards":
      const { dashboards } = message;
      return localforage
        .setItem("dashboards", dashboards)
        .catch(err =>
          console.log("Failed to persist dashboards to local storage: ", err)
        );
    case "setDashboardsToDefault":
      return setDashboardsToDefault();
    default:
      return Promise.reject(
        "Unknown message type provided to Local Storage Web Worker"
      );
  }
});

function setDashboardsToDefault(runtime) {
  switch (runtime) {
    case "JVM":
      return localforage.setItem("dashboards", defaultJVMDashboards);
    default:
      return Promise.reject(
        "Invalid Runtime provided to setDashboardToDefault"
      );
  }
}
