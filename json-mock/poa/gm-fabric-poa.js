const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
const metrics = require("./poa-metrics.json");
const gometrics = require("./poa-gometrics.json");
const system = require("./poa-system.json");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/metrics", (req, res) => {
  res.json(metrics);
});
server.get("/system", (req, res) => {
  res.json(system);
});
server.get("/gometrics", (req, res) => {
  res.json(gometrics);
});

// Use default router
server.use(router);
server.listen(9092, () => {
  console.log("Mocking POA on localhost:9092");
  console.log("Metrics at /system, /metrics, and /gometrics");
});
