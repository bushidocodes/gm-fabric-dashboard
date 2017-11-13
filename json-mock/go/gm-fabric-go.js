const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router();
const middlewares = jsonServer.defaults();
const metrics = require("./metrics.json");
const { PORT } = require("../constants");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/metrics", (req, res) => {
  const requestsIndexGet = Math.floor(Math.random() * 10) + 1;
  metrics["Total/requests"] = requestsIndexGet + requestsIndexGet;
  metrics["HTTP/requests"] = requestsIndexGet;
  metrics["HTTPS/requests"] = requestsIndexGet;
  res.json(metrics);
});

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log(`Mocking GM-Fabric-Go on localhost:${PORT}/metrics`);
});
