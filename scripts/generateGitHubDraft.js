const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Scrape the tag from package JSON
const version = process.env.npm_package_version;

// Scrape the latest content from from the CHANGELOG
// The regular expression matches a leading anchor tag that semantic-release prepends
// to all generated releases. This means that by grabbing the element at index one of the
// array generated by split, we should be grabbing the most recent changelog content

// This solution will potentially break if the semantic-release template changes
// View and troubleshoot the RexExp at https://regexr.com/3kof2

const changelogPath = path.resolve(__dirname, "..", "CHANGELOG.md");
const changelogContent = fs.readFileSync(changelogPath, { encoding: "utf8" });
const semverAnchorRegEx = /<a name="[0-9.]+"><\/a>\n+## \[[0-9.]+\]\([\w://.-]+\) \(\d\d\d\d-\d\d-\d\d\)\n\n/g;
const bodyOfLatestGeneratedChangeLogEntry = changelogContent.split(
  semverAnchorRegEx
)[1];

const payload = {
  tag_name: `v${version}`,
  target_commitish: "master",
  name: `v${version}`,
  body: bodyOfLatestGeneratedChangeLogEntry,
  draft: true,
  prerelease: false
};

axios
  .get(
    // .post(
    `https://api.github.com/repos/DecipherNow/gm-fabric-dashboard/releases`
    // payload,
    // { headers: { Authorization: `token ${process.env.GITHUB_ACCESS_KEY}` } }
  )
  .then(data => console.log(data))
  .catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    process.exit(1);
  });
