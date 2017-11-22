const { services, instances } = require("./data");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
const jvmMetrics = require("../jvm/metrics.json");
const jvmThreads = require("../jvm/threads.json");
const goMetrics = require("../go/metricsWithFunctions.json");
const _ = require("lodash");
const { PORT } = require("../constants");

// Copy the metrics JSON into objects for each instance so they increment separately
// const metricsStore = {};
// instances.forEach(instance => {
//   metricsStore[instance] = Object.assign({}, jvmMetrics);
// });

server.use(middlewares);

const servicesObj = _.mapKeys(
  services,
  service => service.name + service.version
);

// Takes a optional query string of group
server.get("/services", (req, res) => {
  if (req.query.group) {
    return res.json(
      _.filter(services, service => service.group === req.query.group)
    );
  } else {
    return res.json(services);
  }
});

server.get("/metrics/:service/:version/:instance", (req, res) => {
  const { service, version, instance } = req.params;
  const selectedService = services.find(
    serviceObj => serviceObj.name === service && serviceObj.version === version
  );
  if (
    selectedService &&
    selectedService.runtime &&
    selectedService.instances.map(instance => instance.name).includes(instance)
  ) {
    if (selectedService.runtime === "JVM") {
      return res.json(incrementJVMMetrics(jvmMetrics));
    } else if (selectedService.runtime === "GO") {
      return res.json(goMetrics);
    }
  }
  return res.status(404).end();
});

// Note: Just returning the same object for all of the instances.
server.get("/threads/:service/:version/:instance", (req, res) => {
  const { service, version, instance } = req.params;
  const selectedService = services.find(
    serviceObj => serviceObj.name === service && serviceObj.version === version
  );
  if (
    selectedService &&
    selectedService.runtime &&
    selectedService.instances.map(instance => instance.name).includes(instance)
  ) {
    if (selectedService.runtime === "JVM") {
      return res.json(jvmThreads);
    }
  }
  return res.status(404).end();
});

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log(
    `JSON Server is running on port ${
      PORT
    } and mocking the Service Discovery Service`
  );
});

/**
 * Helper func to mutate a metricsObj to simulate some random traffic
 */
function incrementJVMMetrics(metricsObj) {
  const requestsESS = Math.floor(Math.random() * 10) + 1;
  const successesESS = Math.floor(Math.random() * requestsESS);
  metricsObj[
    "route/images_MicroserviceEssOverviewpng/GET/requests"
  ] += requestsESS;
  metricsObj["https/requests"] += requestsESS;
  metricsObj[
    "route/images_MicroserviceEssOverviewpng/GET/status/2XX"
  ] += successesESS;

  const requestsESSDot = Math.floor(Math.random() * 10) + 1;
  const successesESSDot = Math.floor(Math.random() * requestsESS);
  metricsObj[
    "route/images/MicroserviceEssOverview.png/GET/requests"
  ] += requestsESSDot;
  metricsObj["https/requests"] += requestsESSDot;
  metricsObj[
    "route/images/MicroserviceEssOverview.png/GET/status/2XX"
  ] += successesESSDot;

  const requestsSearchPost = Math.floor(Math.random() * 10) + 1;
  const successesSearchPost = Math.floor(Math.random() * requestsSearchPost);
  metricsObj["route/odrive/_search/POST/requests"] += requestsSearchPost;
  metricsObj["https/requests"] += requestsSearchPost;
  metricsObj["route/odrive/_search/POST/status/2XX"] += successesSearchPost;

  const requestsIndexSearchPost = Math.floor(Math.random() * 10) + 1;
  const successesIndexSearchPost = Math.floor(
    Math.random() * requestsIndexSearchPost
  );
  metricsObj["route/index__search/POST/requests"] += requestsIndexSearchPost;
  metricsObj["https/requests"] += requestsIndexSearchPost;
  metricsObj["route/index__search/POST/status/2XX"] += successesIndexSearchPost;

  const requestsIndexGet = Math.floor(Math.random() * 10) + 1;
  const successesIndexGet = Math.floor(Math.random() * requestsIndexGet);
  metricsObj["route/GET/requests"] += requestsIndexGet;
  metricsObj["https/requests"] += requestsIndexGet;
  metricsObj["route/GET/status/2XX"] += successesIndexGet;
  return metricsObj;
}
