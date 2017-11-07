// Stub out different index.html configurations containing different meta tag combinations
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)

// TODO: Mock out a state object for the Reselect selectors

// Note: You'll need to refactor generateSidebarCards to make this easier to test
// The goal should be to refactor out an intermediate selector
// that produces an array of props objects, but doesn't actually pass them into
// <SidebarCard>
xdescribe("getFabricServer", () => {
  xtest("returns the value of the fabricServer meta tag when not equal to __FABRIC_SERVER__", () => {});
  xtest("returns null when the fabricServer meta tag is equal to __FABRIC_SERVER__", () => {});
});
xdescribe("getServiceName", () => {});
xdescribe("getRuntime", () => {});
xdescribe("getMetricsEndpoint", () => {});
xdescribe("getThreadsEndpoint", () => {});
