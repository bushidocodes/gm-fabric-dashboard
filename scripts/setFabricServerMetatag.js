const paths = require("../config/paths");
const replace = require("replace-in-file");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const options = {
  files: paths.appHtml,
  from: /__FABRIC_SERVER__/g,
  to: "http://localhost:1337"
};

const pathOfRunningMarker = path.resolve(".isRunning");

// If the .isRunning file is detected, the app is running, so we want to change back to localhost
fs.access(pathOfRunningMarker, err => {
  if (!err) {
    replace(options)
      .then(changes => {
        console.log(chalk.magenta("Modified files:", changes.join(", ")));
      })
      .catch(error => {
        console.error("Error occurred:", error);
      });
    console.log(
      chalk.magenta(
        ".isRunning file detected, so assuming that app is running and changing metatag back to local"
      )
    );
    return;
  } else {
    if (err.code === "ENOENT") {
      console.log(
        chalk.magenta(
          "Did not detect .isRunning file, so not reverting index.html meta tag to localhost:1337"
        )
      );
    } else {
      console.log(chalk.magenta("Failed to detect .isRunning with ", err.code));
    }
  }
});
