const createTestCafe = require("testcafe");
const glob = require("glob-promise");
const BrowserStack = require("browserstack");

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

const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD
};

async function getFiles(globPattern) {
  return await glob(globPattern)
    .then(files => files)
    .catch(e => console.error(e));
}

async function getRunningBrowserstackSessions() {
  const client = BrowserStack.createClient(browserStackCredentials);
  const workerStatus = await new Promise(function(resolve, reject) {
    client.getApiStatus((error, workers) => {
      if (error) reject(error);
      else resolve(workers);
    });
  });
  return workerStatus;
}

async function createTestCafeInstance(browser, files) {
  let testcafe;
  await createTestCafe()
    .then(tc => {
      testcafe = tc;
      return tc
        .createRunner()
        .startApp("npm start")
        .src(files)
        .browsers(browser)
        .run();
    })
    .then(failedCount => {
      console.log("Tests failed: " + failedCount);
      testcafe.close();
    })
    .catch(err => console.error(err));
}

async function startTests(browsers, createTestCafeInstance) {
  // The testcafe node api does not accept glob patterns, so grab relevant test files using node-glob
  let files = await getFiles("e2e-tests/tests/*.js");
  // Check that there are no tests already running
  let sessionInfo = await getRunningBrowserstackSessions();
  if (sessionInfo.running_sessions !== 0) {
    console.error(
      "There are not enough available Browserstack workers to run these tests. Please cancel any running sessions from the Browserstack Automate dashboard and try again."
    );
  } else {
    // Create a new testcafe instance for each batch of browsers
    for (let i = 0; i < browsers.length; i++) {
      await createTestCafeInstance(browsers[i], files);
    }
  }
}

startTests(SUPPORTED_BROWSERS, createTestCafeInstance);
