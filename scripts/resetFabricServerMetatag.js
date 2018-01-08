const paths = require("../config/paths");
const replace = require("replace-in-file");
const chalk = require("chalk");

const options = {
  files: paths.appHtml,
  from: /http:\/\/localhost:1337/g,
  to: "__FABRIC_SERVER__"
};

console.log(chalk.magenta("Running resetFabricServerMetatag"));

replace(options)
  .then(changes => {
    if (changes.length === 0) {
      console.log(chalk.magenta("http://localhost:1337 not found in header."));
    } else {
      console.log(
        chalk.magenta(
          "Replaced http://localhost:1337 with __FABRIC_SERVER__ in index.html"
        )
      );
    }
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });
