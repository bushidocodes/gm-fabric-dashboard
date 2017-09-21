const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const fabricServer =
  process.env.FABRIC_SERVER ||
  "https://edge.deciphernow.com/services/discovery-service/1.0/";

const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets, and do not automatically direct to the index
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { index: false })
);

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  readFile(path.resolve(__dirname, "..", "build", "index.html"), "utf8")
    .then(data => data.replace(/__FABRIC_SERVER__/g, fabricServer))
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

module.exports = app;
