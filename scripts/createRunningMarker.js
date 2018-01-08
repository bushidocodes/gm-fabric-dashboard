const fs = require("fs");
const path = require("path");

// Create an empty file called .isRunning in the parent directory to signify that the app is currently running.
const pathOfRunningMarker = path.resolve(".isRunning");

fs.writeFile(pathOfRunningMarker, "w", function(err, file) {
  if (err) throw err;
  console.log(`Saved .isRunning marker to ${pathOfRunningMarker}!`);
});
