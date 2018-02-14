const createTestCafe = require("testcafe");

const SUPPORTED_BROWSERS = [
  "browserstack:chrome@64.0:OS X High Sierra",
  "browserstack:chrome@63.0:OS X High Sierra",
  "browserstack:firefox@58.0:OS X High Sierra",
  "browserstack:firefox@57.0:OS X High Sierra",
  "browserstack:safari@11.0:OS X High Sierra",
  "browserstack:safari@10.1:OS X Sierra",
  "browserstack:edge@16.0:Windows 10",
  "browserstack:edge@15.0:Windows 10",
  "browserstack:ie@11.0:Windows 10"
];

let testcafe;
// The following is an alternate method for initializing testcafe.
// TODO: implement this so we can delete the bash script #1513
createTestCafe("localhost", 9000)
  .then(tc => {
    testcafe = tc;
    return tc
      .createRunner()
      .startApp("npm start")
      .src("tests/sample.js")
      .browsers("browserstack:chrome@64.0:OS X High Sierra")
      .run();
  })
  .then(failedCount => {
    console.log("Tests failed: " + failedCount);
    testcafe.close();
  })
  .catch(err => console.error(err));
