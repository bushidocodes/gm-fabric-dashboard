var fs = require("fs");
const path = require("path");

// Delete the empty file .isRunning from the parent directory to signify that the app is no longer running.
const pathOfRunningMarker = path.resolve(".isRunning");

fs.unlink(pathOfRunningMarker, function(err) {
  if (err) throw err;
  console.log(`File deleted from ${pathOfRunningMarker}!`);
});
