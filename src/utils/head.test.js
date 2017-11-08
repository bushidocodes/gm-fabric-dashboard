// Stub out different index.html configurations containing different meta tag combinations
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)

// TODO: Mock out a state object for the Reselect selectors

// Note: You'll need to refactor generateSidebarCards to make this easier to test
// The goal should be to refactor out an intermediate selector
// that produces an array of props objects, but doesn't actually pass them into
// <SidebarCard>

import {
  getFabricServer,
  getServiceName,
  getRuntime,
  getMetricsEndpoint,
  getThreadsEndpoint
} from "./head.js";

const documentHead = `
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Grey Matter Fabric</title>
`;

describe("getFabricServer", () => {
  test("returns the value of the fabricServer meta tag when not equal to __FABRIC_SERVER__", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="http://localhost:1337">`;
    expect(getFabricServer()).toEqual("http://localhost:1337");
  });

  test("returns null when the fabricServer meta tag is equal to __FABRIC_SERVER__", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">`;
    expect(getFabricServer()).toEqual(null);
  });
});

describe("getServiceName", () => {
  test("returns null if getFabricServer() returns an address", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="http://localhost:1337">
       <meta property="serviceName" content="www.exampleServiceName.com">`;
    expect(getServiceName()).toEqual(null);
  });

  test("returns the value of the serviceName meta tag when its not to equal to __SERVICE_NAME__ and when getFabricServer() returns null", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="serviceName" content="www.exampleServiceName.com">`;
    expect(getServiceName()).toEqual("www.exampleServiceName.com");
  });

  test("returns 'Service' when the value of serviceName meta tag equals to __SERVICE_NAME__ and when getFabricServer() returns null", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="serviceName" content="__SERVICE_NAME__">`;
    expect(getServiceName()).toEqual("Service");
  });
});

describe("getRuntime", () => {
  test("returns null if getFabricServer() returns an address", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="http://localhost:1337">
       <meta property="runtime" content="__RUNTIME__">`;
    expect(getRuntime()).toEqual(null);
  });

  test("returns the value of the runtime meta tag when it doesn't contain '__RUNTIME' and when getFabricServer() returns null", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="GO">`;
    expect(getRuntime()).toEqual("GO");
  });

  test("returns 'JVM' when the value of runtime meta tag equals to __RUNTIME__ and when getFabricServer() returns null", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="__RUNTIME__">`;
    expect(getRuntime()).toEqual("JVM");
  });
});

describe("getMetricsEndpoint", () => {
  test("returns null if getFabricServer() returns an address", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="http://localhost:1337">
       <meta property="metricsEndpoint" content="__METRICS_ENDPOINT__`;
    expect(getMetricsEndpoint()).toEqual(null);
  });

  test("returns 'metrics' if getFabricServer() doesn't return an address, process ENV is set to 'development' and getRuntime() value is 'GO'", () => {
    process.env.NODE_ENV = `development`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="GO">
       <meta property="metricsEndpoint" content="__METRICS_ENDPOINT__">`;
    expect(getMetricsEndpoint()).toEqual("metrics");
  });

  test("returns 'admin/metrics.json' if getFabricServer() doesn't return an address, process ENV is set to 'development' and getRuntime() value is 'JVM'", () => {
    process.env.NODE_ENV = `development`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="JVM">
       <meta property="metricsEndpoint" content="__METRICS_ENDPOINT__">`;
    expect(getMetricsEndpoint()).toEqual("admin/metrics.json");
  });

  test("returns content of metricsEndpoint if getFabricServer() doesn't return an address, process ENV isn't set to 'development' and metricsEndpoint meta tag's content isn't '__METRICS_ENDPOINT__'", () => {
    process.env.NODE_ENV = `notDevelopment`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="JVM">
       <meta property="metricsEndpoint" content="www.metricsEndpoint.com">`;
    expect(getMetricsEndpoint()).toEqual("www.metricsEndpoint.com");
  });

  test("returns '' if getFabricServer() doesn't return an address, process ENV isn't set to 'development' and metricsEndpoint meta tag's content is set to '__METRICS_ENDPOINT__'", () => {
    process.env.NODE_ENV = `notDevelopment`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="JVM">
       <meta property="metricsEndpoint" content="__METRICS_ENDPOINT__">`;
    expect(getMetricsEndpoint()).toEqual("");
  });
});

describe("getThreadsEndpoint", () => {
  test("returns null if getFabricServer() returns an address", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="http://localhost:1337">
       <meta property="threadsEndpoint" content="__THREADS_ENDPOINT__">`;
    expect(getThreadsEndpoint()).toEqual(null);
  });

  test("returns 'admin/threads' if getFabricServer() doesn't return an address, process ENV is set to 'development' and runtime meta tag content is set to 'JVM'", () => {
    process.env.NODE_ENV = `development`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="JVM">
       <meta property="threadsEndpoint" content="__THREADS_ENDPOINT__">`;
    expect(getThreadsEndpoint()).toEqual("admin/threads");
  });

  xtest("returns content of threadsEndpoint meta tag if getFabricServer() doesn't return an address, process ENV is set to 'production' and runtime meta tag content is set to 'JVM'", () => {
    // this test currently isnt working because react-test-renderer doesn't support production environment shallow rendered until next patch to 16.0.0
    // https://github.com/facebook/react/issues/10938
    // https://github.com/facebook/react/pull/11112
    process.env.NODE_ENV = `production`;
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="JVM">
       <meta property="threadsEndpoint" content="www.threadsEndpoint.com">`;
    expect(getThreadsEndpoint()).toEqual("www.threadsEndpoint.com");
    jest.resetModules();
  });

  test("returns '' if getFabricServer() doesn't return an address and runtime meta tag content is not set to 'JVM'", () => {
    document.head.innerHTML =
      documentHead +
      `<meta property="fabricServer" content="__FABRIC_SERVER__">
       <meta property="runtime" content="GO">
       <meta property="threadsEndpoint" content="www.threadsEndpoint.com">`;
    expect(getThreadsEndpoint()).toEqual("");
  });
});
