const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
const metrics = require("./metrics.json");
const threads = require("./threads.json");

//

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/admin/metrics.json", (req, res) => {
  const requestsESS = Math.floor(Math.random() * 10) + 1;
  const successesESS = Math.floor(Math.random() * requestsESS);
  metrics[
    "route/images_MicroserviceEssOverviewpng/GET/requests"
  ] += requestsESS;
  metrics["https/requests"] += requestsESS;
  metrics[
    "route/images_MicroserviceEssOverviewpng/GET/status/2XX"
  ] += successesESS;

  const requestsESSDot = Math.floor(Math.random() * 10) + 1;
  const successesESSDot = Math.floor(Math.random() * requestsESS);
  metrics[
    "route/images/MicroserviceEssOverview.png/GET/requests"
  ] += requestsESSDot;
  metrics["https/requests"] += requestsESSDot;
  metrics[
    "route/images/MicroserviceEssOverview.png/GET/status/2XX"
  ] += successesESSDot;

  const requestsSearchPost = Math.floor(Math.random() * 10) + 1;
  const successesSearchPost = Math.floor(Math.random() * requestsSearchPost);
  metrics["route/odrive/_search/POST/requests"] += requestsSearchPost;
  metrics["https/requests"] += requestsSearchPost;
  metrics["route/odrive/_search/POST/status/2XX"] += successesSearchPost;

  const requestsIndexSearchPost = Math.floor(Math.random() * 10) + 1;
  const successesIndexSearchPost = Math.floor(
    Math.random() * requestsIndexSearchPost
  );
  metrics["route/index__search/POST/requests"] += requestsIndexSearchPost;
  metrics["https/requests"] += requestsIndexSearchPost;
  metrics["route/index__search/POST/status/2XX"] += successesIndexSearchPost;

  const requestsIndexGet = Math.floor(Math.random() * 10) + 1;
  const successesIndexGet = Math.floor(Math.random() * requestsIndexGet);
  metrics["route/GET/requests"] += requestsIndexGet;
  metrics["https/requests"] += requestsIndexGet;
  metrics["route/GET/status/2XX"] += successesIndexGet;

  res.json(metrics);
});

server.get("/admin/threads", (req, res) => {
  threads["threads"]["2"]["priority"] = Math.floor(Math.random() * 10) + 1;
  res.json(threads);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(9990, () => {
  console.log("JSON Server is running and mocking GM-Fabric-JVM");
});
