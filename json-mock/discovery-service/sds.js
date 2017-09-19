const { services, groups } = require("./data");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
const metrics = require("../jvm/metrics.json");
const threads = require("../jvm/threads.json");
const _ = require("lodash");

// Copy the metrics JSON into objects for each instance so they increment separately

const instances = services.reduce((instances, service) => {
  return [...instances, ...service.instances];
}, []);

const metricsStore = {};
instances.forEach(instance => {
  metricsStore[instance] = Object.assign({}, metrics);
});

server.use(middlewares);

server.get("/groups", (req, res) => {
  res.json(groups);
});

server.get("/instances", (req, res) => {
  if (req.query.serviceId) {
    const match = services.find(service => service.id === req.query.serviceId);
    if (!match) {
      res.json([]);
    } else {
      res.json(match.instances);
    }
  } else {
    res.json(instances);
  }
});

// Takes a query string of groupId c
server.get("/services", (req, res) => {
  if (req.query.groupId) {
    res.json(
      _.filter(services, service => service.group === req.query.groupId)
    );
  } else {
    res.json(services);
  }
});

server.get("/metrics/:instanceId", (req, res) => {
  const { instanceId } = req.params;
  if (Object.keys(metricsStore).includes(instanceId)) {
    res.json(metricsStore[instanceId]);
  } else {
    res.status(404).end();
  }
});

// Note: Just returning the same object for all of the instances.
server.get("/threads/:instanceId", (req, res) => {
  threads["threads"]["2"]["priority"] = Math.floor(Math.random() * 10) + 1;
  res.json(threads);
});

// Use default router
server.use(router);
server.listen(9990, () => {
  console.log(
    "JSON Server is running on port 9990 and mocking the Service Discovery Service"
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
