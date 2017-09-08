import registerPromiseWorker from "promise-worker/register";
import localforage from "localforage";
import _ from "lodash";
import defaultJVMDashboards from "../json/jvm/dashboards.json";
import defaultGolangDashboards from "../json/golang/dashboards.json";

registerPromiseWorker(message => {
  // Bail immediately if the message lacks runtime or type attributes
  if (!message.runtime) {
    return Promise.reject("message.runtime is undefined");
  }
  if (!message.type) {
    return Promise.reject("message.type is undefined");
  }
  switch (message.type) {
    case "init":
      const { basename } = message;
      return localforage.config({
        name: `grey-matter-fabric-${basename}`,
        description:
          "Persistent storage of Grey Matter Fabric dashboards and settings"
      });
    case "getDashboards":
      return localforage.getItem("dashboards").then(savedDashboards => {
        if (
          savedDashboards &&
          _.every(
            savedDashboards,
            dashboard => dashboard.runtime === message.runtime
          )
        ) {
          return savedDashboards;
        } else {
          return setDashboardsToDefault(message.runtime);
        }
      });
    // .catch(err => console.log("getDashboards failed with ", err));
    case "setDashboards":
      const { dashboards } = message;
      return localforage
        .setItem("dashboards", dashboards)
        .catch(err =>
          console.log("Failed to persist dashboards to local storage: ", err)
        );
    case "setDashboardsToDefault":
      return setDashboardsToDefault(message.runtime);
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
    case "GOLANG":
      return localforage.setItem("dashboards", defaultGolangDashboards);
    default:
      return Promise.reject(
        "Invalid Runtime provided to setDashboardToDefault"
      );
  }
}
