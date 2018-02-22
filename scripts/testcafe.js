const createTestCafe = require("testcafe");

// Each sub array defines a batch of browserstack workers.
// Our current plan allows for a max of 5 workers at a time,
// so to avoid crashing browserstack we group our browsers
// into 2 batches that run will run consecutively.
const SUPPORTED_BROWSERS = [
  [
    "browserstack:safari@11.0:OS X High Sierra",
    "browserstack:safari@10.1:OS X Sierra",
    "browserstack:edge@16.0:Windows 10",
    "browserstack:edge@15.0:Windows 10",
    "browserstack:ie@11.0:Windows 10"
  ],
  [
    "browserstack:chrome@64.0:OS X High Sierra",
    "browserstack:chrome@63.0:OS X High Sierra",
    "browserstack:firefox@58.0:OS X High Sierra",
    "browserstack:firefox@57.0:OS X High Sierra"
  ]
];

async function createTestCafeInstance(browser) {
  let testcafe;
  await createTestCafe()
    .then(tc => {
      testcafe = tc;
      return tc
        .createRunner()
        .startApp("npm start")
        .src("e2e-tests/tests/service-view.js")
        .browsers(browser)
        .run();
    })
    .then(failedCount => {
      console.log("Tests failed: " + failedCount);
      testcafe.close();
    })
    .catch(err => testcafe.close());
}

async function startTests(browsers, createTestCafeInstance) {
  for (let index = 0; index < browsers.length; index++) {
    await createTestCafeInstance(browsers[index]);
  }
}

startTests(SUPPORTED_BROWSERS, createTestCafeInstance);
