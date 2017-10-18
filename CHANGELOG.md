# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.1] - 2017-10-18
### Added
- Implemented a service dashboard, which currently only is used to navigate to microservice instance dashboards.
- Linked the fabric dashboard nav elements to the new service dashboards
### Changed
- Increased uptime precision
- General keyboard and a11y improvements, including a link to skip to main content
- Fixed group by capability and group by owner bugs
### Removed
- Removed scss stylesheets that have been decomposed into styled-components

### Test Coverage: 3.51% ([0.7.1 Coverage Report])
### Bundle Size: ~1.62 MB ([0.7.1 Bundle Size Report])
### Production Build: ([0.7.1 Build])

## [0.7.0] - 2017-10-12
### Added
- App renders cleanly on IE11. Hooray for the Enterprise!
- App is navigable by keyboard
- Services landing page now has a route driven search
- New Publish script simplifies Docker deployment process
### Changed
- Massive bug bash. Greater stability throughout the app
- Further internal refactoring from SCSS towards Styled-Components
- Updated dependencies

### Test Coverage: 3.36% ([0.7.0 Coverage Report])
### Bundle Size: ~1.61 MB ([0.7.0 Bundle Size Report])
### Production Build: ([0.7.0 Build])

## [0.6.0] - 2017-10-03
### Added
- Added support for polling of groups from the "Fabric Server" discovery service
- Implemented Phase 0 Services view, including searching and filtering
- Implemented an interim solution for selection of instances from the table view.
- Added unit tests for trimID
- Improved in-line comments throughout the app
- Created production-ready Docker image to facilitate new Docker-based deployment process.
### Changed
- Implemented React Storybook for development of UI components in isolation from the larger app
- Began process of refactoring sass into Styled-Components based React components
- Updated dependencies, including React 16.0 and Enzyme 3.

### Test Coverage: 3.45% ([0.6.0 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.6.0 Bundle Size Report])
### Production Build: ([0.6.0 Build])

## [0.5.0] - 2017-09-15
### Added
- Improved dashboard support for the gm-fabric-go microservice metrics API
- Added support for backed "Fabrics Server" discovery service support behind a flag. This includes UI components and routing to allow a single dashboard to monitor a fabric of microservices.
- Added interim Docker container tooling for the dev pipeline. This will be improved in the future.
### Changed
- Disabled local storage persistence of dashboards pending further work on dashboard customization tools
- External Web fonts are new embedded into the app to render in environments with no Internet connectivity
- Fixed URL import support in sass files, inlcuding mesh image in sidebar footer
- Reorganized source files according to runtime and responsibility

### Test Coverage: 3.42% ([0.5.0 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.5.0 Bundle Size Report])
### Production Build: ([0.5.0 Build])

## [0.4.0] - 2017-09-08
### Added
- Experimental support for gm-fabric-go microservices
### Changed
- Updated dependencies
- Simplified use of Webpack Dev Server proxy
- Substantial internal refactoring to separate out runtime-specific components into modules

### Test Coverage: 4.27% ([0.4.0 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.4.0 Bundle Size Report])
### Production Build: ([0.4.0 Build])

## [0.3.3] - 2017-09-01
### Changed
- Minor style changes
- Updated dependencies

### Test Coverage: 5.53% ([0.3.3 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.3.3 Bundle Size Report])
### Production Build: ([0.3.3 Build])

## [0.3.2] - 2017-08-23
### Added
- Improved style and responsiveness
### Changed
- Refactored AJAX web worker for improved error handling
- Improvement deployment process to help us prepare for new features
- Improved use of History API by Explorer component

### Test Coverage: 5.55% ([0.3.2 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.3.2 Bundle Size Report])
### Production Build: ([0.3.2 Build])

## [0.3.1] - 2017-08-18
### Added
- Colors! The app now has sass through the use of sophisticated SCSS mixins and functions. This is implemented on the Summary page and provides us a strong foundation for expanded use of colors in the future.
- Created a new Inspector element for the explorer view that is React Fiber ready and allows faster searching across a large corpus of metrics. Search time has gone from ~3 seconds to near instant.
- The Explorer is now route driven to allow users to send each other specific views by copy/pasting the URL.
- The edge port now properly shows 443 or 80 depending on if TLS is used.
- Large numbers are not styled appropriately based on operating system and browser locale settings. For example, this means that one thousand point one is 1,000.1 in the US and 1.000,1 in Germany.
### Changed
- Modified Webpack config to use prepacked UglifyJS
- Improved the mock GM-Fabric-JVM endpoint, including fixing the threads endpoint, adding a single randomized element to ensure that the threads components were dynamically updating as expected, and providing a means to simulate a microservice not reporting any known HTTP/HTTPS routes
- Updated numerous dependencies. Most significantly, this including updating to React 16.0.0-beta.5 to allow us a means to troubleshoot UI components that are incompatible with the new React Fiber architecture.
### Removed
- Removed dependencies on JSON-Inspector and UglifyJS

### Test Coverage: 3.29% ([0.3.1 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.3.1 Bundle Size Report])
### Production Build: ([0.3.1 Build])

## [0.3.0] - 2017-08-10
### Added
- Significant amounts of UX polish
- Added footer
- Back button in sidebar can now be configured to point to a target URL via the backButtonUrl head attribute
- Added numerous heads-up vitals to the summary component

### Changed
- Fixed a Local Storage Bug
- Significantly changed the routes component to make it easier to diagnose issues and dive in for a closer look
- Set the default polling rate to 5 seconds
- Changed the default runtime to JVM, as this is the only currently supported runtime

### Removed
- Although moving and resizing grids was pretty cool, this functionality has been disabled until we have further enhanced the tools to create, edit, and delete dashboards, including defining new charts.

### Test Coverage: 3.35% ([0.3.0 Coverage Report])
### Bundle Size: ~ 1.5 MB ([0.3.0 Bundle Size Report])
### Production Build: ([0.3.0 Build])

## [0.2.1] - 2017-08-04
### Added
- Implemented Prettier for CSS
- Added Dygraphs, Worker-Loader, PromiseWorker, node-sass, sass-loader

### Changed
- Modified Graphite and other components in docker-compose infrastructure
- Ejected from Create React App
- Updated WebPack to 3.x and a bunch of other minor point releases
- Refactored stylesheet source from from less to scss
- Reimplemented GMLineChart using dygraphs
- Reimplemented AJAX and LocalStorage functionality as Web Workers
- Substantially refactored utils to use the simpler native dygraph structure
- Set nav cards to open by default if drawer exists
- Fall back to Hash History to preserve JS source maps.

### Removed
- Removed Prometheus from docker-compose infrastructure
- Removed Stylelint, Recharts

### Test Coverage: 3.5% ([0.2.1 Coverage Report])
### Bundle Size: ~ 1.4 MB ([0.2.1 Bundle Size Report])
### Production Build: ([0.2.1 Build])

## [0.2.0] - 2017-07-28
### Added
- Added preliminary docker-compose infrastructure for developing against Envoy and a timeseries database
- Added breadcrumbs and a new bar at the top of the main view
- Added summary and instance links (currently mocked out) at the top of the new sidebar

### Changed
- Replaced horizontal nav with vertical sidebar style nav
- Nav cards now place metrics and sparklines in a drawer that can be collapsed or opened
- Nav cards now can render icons from UIKit 3
- Moved settings to an icon at the new bar at the top of the main view
- Restored active nav highlighting regression introduced by React Router v4 update
- Updated README with new information about use of Docker during development

### Test Coverage: 3.7% ([0.2.0 Coverage Report])

## [0.1.1] - 2017-07-21
### Added
- Added Prettier with default settings, refactored all source JS code, and set a pre-commit hook for Prettier and stylelint
- Add text to README about a workaround if Jest fails test unexpectedly

### Changed
- Updated the CircleCI config to follow version 2 standards
- Changed from `jest-junit-reporter` to `jest-junit` an alternate junior formatter for Jest test results
- Changed the production build process and tooling to fix issues with deep React Router routes interfering with JS bundle loading
- Updated `react-scripts` to 1.0.10
- Resolved outstanding ESLINT errors

### Removed
- Removed static React components built for Grey Matter Fabric Go microservices
- Removed ESLint rules that are now handled by Prettier

### Test Coverage: 4% ([0.1.1 Coverage Report])

## [0.1.0] - 2017-07-18
### Added
- Generated app using Create React App, adding Redux, React-Redux, React-Router, Jumpstate, UIKit 3, Recharts, Sparklines, less, stylelint
- Added scraper to ingest metrics from a Finagle metrics.json file complete with user configurable period.
- Created various utility functions to manipulate timeseries data.
- Created a system for generating dashboards from state persisted as JSON
- Created a general purpose grid system that allows resize-able drag-and-dropable chart
- Created a handful of generate purpose charts
- Created hand-crafted charts and dashboards for summary metrics, routes, and stack traces
- Created a general-purpose Explorer that displays a line chart for any arbitrary metric
- Wrote several unit tests
- Created a CircleCI CI pipeline with JUNIT reporting and Istanbul code coverage reporting
- Created BASH deployment scripts that allow for nesting in a deep route
- Wrote a README explaining how to use the dashboard

### Test Coverage: 2%

[Unreleased]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.7.1...HEAD
[0.7.1]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.7.0...v0.7.1
[0.7.1 Coverage Report]: https://1014-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.7.1 Bundle Size Report]: https://1014-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.7.1 Build]: https://1014-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.7.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.6.0...v0.7.0
[0.7.0 Coverage Report]: https://948-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.7.0 Bundle Size Report]: https://948-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.7.0 Build]: https://948-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.6.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.5.0...v0.6.0
[0.6.0 Coverage Report]: https://781-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.6.0 Bundle Size Report]: https://781-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.6.0 Build]: https://781-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.5.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.4.0...v0.5.0
[0.5.0 Coverage Report]: https://703-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.5.0 Bundle Size Report]: https://703-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.5.0 Build]: https://703-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.4.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.3.3...v0.4.0
[0.4.0 Coverage Report]: https://682-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.4.0 Bundle Size Report]: https://682-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.4.0 Build]: https://682-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.3.3]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.3.3...v0.3.3
[0.3.3 Coverage Report]: https://653-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.3.3 Bundle Size Report]: https://653-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.3.3 Build]: https://653-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.3.2]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.3.1...v0.3.2
[0.3.2 Coverage Report]: https://606-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.3.2 Bundle Size Report]: https://606-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.3.2 Build]: https://606-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.3.1]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.3.0...v0.3.1
[0.3.1 Coverage Report]: https://538-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.3.1 Bundle Size Report]: https://538-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.3.1 Build]: https://538-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.3.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.2.1...v0.3.0
[0.3.0 Coverage Report]: https://493-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.3.0 Bundle Size Report]: https://493-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.3.0 Build]: https://493-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.2.1]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.2.0...v0.2.1
[0.2.1 Coverage Report]: https://354-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.2.1 Bundle Size Report]: https://354-85883218-gh.circle-artifacts.com/0/home/circleci/repo/bundlesize/report.html
[0.2.1 Build]: https://354-85883218-gh.circle-artifacts.com/0/home/circleci/repo/build.tar.gz
[0.2.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.1.1...v0.2.0
[0.2.0 Coverage Report]: https://309-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.1.1]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/v0.1.0...v0.1.1
[0.1.1 Coverage Report]: https://258-85883218-gh.circle-artifacts.com/0/home/circleci/repo/coverage/lcov-report/index.html
[0.1.0]: https://github.com/DecipherNow/gm-fabric-dashboard/compare/5a0e78...v0.1.0
