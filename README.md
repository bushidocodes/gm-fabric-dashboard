<div align="center">
  <h1>Grey Matter Fabric Dashboard</h1>
</div>

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested on CircleCI](https://circleci.com/gh/DecipherNow/gm-fabric-dashboard/tree/master.svg?style=shield)](https://circleci.com/gh/DecipherNow/gm-fabric-dashboard/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/5897b230fb0a038b75d8/maintainability)](https://codeclimate.com/github/DecipherNow/gm-fabric-dashboard/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5897b230fb0a038b75d8/test_coverage)](https://codeclimate.com/github/DecipherNow/gm-fabric-dashboard/test_coverage)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Dependency Status](https://david-dm.org/deciphernow/gm-fabric-dashboard.svg)](https://david-dm.org/deciphernow/gm-fabric-dashboard)

Grey Matter Fabric Dashboard provides fine-grained health monitoring and statistics for distributed systems built with the [Grey Matter Fabric microservice framework](http://deciphernow.com/grey-matter#fabric). The framework includes SDKs for [JVM-based languages](https://github.com/DecipherNow/gm-fabric-jvm) and [Go](https://github.com/DecipherNow/gm-fabric-go), as well as a [pass-through agent](https://github.com/DecipherNow/gm-fabric-jvmagent) that makes it possible to extend end-to-end visibility to existing services built outside of our framework. Support for Python and other languages is currently in progress.

## Demo

![Animated GIF showing product in action](https://media.giphy.com/media/3o6fJ7w7GS3PyUKq2c/giphy.gif)

## Prerequisites

### 1. Install Docker

Download and install the binary for [Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac), [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows), or [Linux](https://store.docker.com/search?architecture=amd64&offering=community&operating_system=linux&platform=server&q=&type=edition)

### 2. Use docker to start an example Grey Matter Microservice

### For a JVM-based microservice:

Run `docker run -it -p 1337:9990 spmcbride1201/gm-fab-jvm`

After starting your microservice, you should see a valid JSON file [at this endpoint](http://localhost:1337/admin/metrics.json). If you see JSON data, you are ready to proceed.

### For a Go-based microservice:

Run `docker run -it -p 1337:10001 drfogout/metricssimple`

After starting your microservice, you should see a valid JSON file [at this endpoint](http://localhost:1337/metrics). If you see JSON data, you are ready to proceed.#

### For a Mock Service Discovery Service (SDS) microservices:

After you install the project (steps in the section Installation), open a new terminal window and in the root of the project run `npm run mock-sds`

### 3. Install Node.js and the npm package manager via a version management tool

Because new major versions of the Node.js runtime are released every six months, half of which are not tied to the [Node.js Long Term Support (LTS) cycle](https://github.com/nodejs/LTS), it is advisable to use a version manager to be able to move between Node.js versions via a version management tool.

If you are using Linux, Mac OS, or the new Windows System for Linux, we suggest using [nvm](https://github.com/creationix/nvm)
If you are using the standard Windows CMD.exe/PowerShell environment, we suggest using [nvm-windows](https://github.com/coreybutler/nvm-windows)

Refer to the README for these tools for detailed instructions on installing Node and NPM.

## Installation

```sh
git clone https://github.com/DecipherNow/gm-fabric-dashboard.git
cd gm-fabric-dashboard
npm install
```

## Configuration

If JVM microservice (gm-fabric-jvm) :
Edit `./public/index.html` by replacing `__RUNTIME__` with `JVM`

If GO microservice (gm-fabric-go):
Edit `./public/index.html` by replacing `__RUNTIME__` with `GO`

If Service Discovery Service (SDS) microservice (mock-sds):
Edit `./public/index.html` by commenting out `<meta property="fabricServer" content="__FABRIC_SERVER__">` and uncommenting `<meta property="fabricServer" content="http://localhost:1337">`

## Use

### General Users trying the Dashboard

1. Ensure a microservice is running on your system serving metrics.json from [http://localhost:9990/admin/metrics.json](http://localhost:9990/admin/metrics.json)
2. From the project directory `./gm-fabric-dashboard`, run `npm start` and [http://localhost:3000](http://localhost:3000) will open automatically in your browser
3. Report bugs or desired enhancements on [the project's issues page](https://github.com/DecipherNow/gm-fabric-dashboard/issues)
4. When finished, stop the local server serving your dashboard (and perhaps the local server serving your microservice) by pressing `control+c` on the respective terminals running these servers

### Developers building, testing, and integrating the Dashboard

#### `npm start` to develop features and crush bugs

This runs the app in the development mode and automatically opens [http://localhost:3000](http://localhost:3000) in your browser. You can open the source code in your editor of choice, and the page will reload if you make edits.

We suggest use of [Prettier](https://github.com/prettier/prettier#editor-integration), [EditorConfig](http://editorconfig.org/#download), and [ESList](http://eslint.org/docs/user-guide/integrations) plugins in your editor to use the projects style rules.

Additionally, if you are a VSCode user, this project supports in-editor debugging via the [Debugger for Chrome extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and has a custom dictionary for the [Code Spellchecker extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

#### `npm test` to enhance front-end unit test coverage

This launches the Jest test runner in interactive watch mode.<br>
See the Create React App section about [running tests](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests) for more information.

Note: If you are running on Mac OS, tests might fail with the error `Error: Error watching file for changes: EMFILE`. If you see this, install watchman via brew with the command `brew install watchman`. Read more about this workaround [on this Jest issue](https://github.com/facebook/jest/issues/1767)

#### `npm run build` to prepare the Dashboard for deployment to the core `gm-fabric-jvm` project

This builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Once built, the production bundle is minified and ready for deployment. The dashboard assumes that it is monitoring a microservice at the root path with Twitter Server metrics accessible at `/admin/metrics.json` and `/admin/threads`. The dashboard itself is served from `/gmadmin/`.

In order to support deployment of the dashboard to monitor a microservice that doesn't own the root path, this projects injects the string template `__BASE_URL__` in the minified index.html file and JS bundle that can be replaced to set the desired path. For your convenience, a BASH script is provided to simplify this deployment process and provide an undo option.

For example, if you are going to deploy the dashboard to a microservice located at `http://www.deciphernow.com/my/awesome/microservice/`, your dashboard will be located at the path `/my/awesome/microservice/gmadmin/` and poll endpoints at `/my/awesome/microservice/admin/metrics.json` and `/my/awesome/microservice/admin/threads`. To configure the dashboard for this path,`cd` into the ./build directory and execute `sudo ./setPath.sh /my/awesome/microservice/gmadmin/`. Please note that the path should have both an opening and a trailing slash. Additionally, the path must terminate in `/gmadmin/` to allow the dashboard to properly determine the URLs of the scrape targets. If you do not have `/gmadmin/` at the end of the string you pass into `setPath.sh`, the deployment script will fail and exit. After running this script successfully, your application is ready to be deployed.

If you intend to retrofit this dashboard on an existing GM Fabric JVM microservice, you likely will need to proxy `/my/awesome/microservice/admin/metrics.json` and `/my/awesome/microservice/admin/threads` to the expected path as outlined above.

In case of error or mis-configuration, your original `index.html` has been backed up to `index.html.old`. To revert to the backup, run `sudo ./setPath.sh undo` and rerun with the correct argument.

In addition to `__BASE_URL__`, the HEAD of index.html also has an meta attribute with a `__BASE_RUNTIME__` template string. This signifies to the dashboard whether the dashboard intends to scrape a Finagle-style `metrics.json` or an alternate Decipher-designed metrics endpoint provided by a Go microservice. The permissable values are `JVM`, `GO`, or `ENVOY`. Currently, the `setPath.sh` script does not modify this template.
