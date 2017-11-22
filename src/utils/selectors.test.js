import state from "../json/mockReduxState";

const {
  getRoutesMetrics,
  getRoutesTree,
  metricsKeySelectorGenerator
} = require.requireActual("./selectors");

const simpleState = {
  instance: {
    metrics: {
      "fake/wacky_system": {
        1511370076883: 2
      },
      "system/cpu_cores": {
        1511370076883: 2
      }
    }
  }
};

describe("Function metricsKeySelectorGenerator", () => {
  test("returns a Reselect selector", () => {
    expect(metricsKeySelectorGenerator()).toHaveProperty("resultFunc");
    expect(metricsKeySelectorGenerator()).toHaveProperty("recomputations");
    expect(metricsKeySelectorGenerator()).toHaveProperty("resetRecomputations");
  });
  test("returns all keys strictly matching a prefix when isPrefix is true", () => {
    expect(metricsKeySelectorGenerator("system")(simpleState)).toEqual({
      "system/cpu_cores": { "1511370076883": 2 }
    });
  });
  test("returns all keys loosely containing a string when isPrefix is false", () => {
    expect(metricsKeySelectorGenerator("system", false)(simpleState)).toEqual({
      "fake/wacky_system": { "1511370076883": 2 },
      "system/cpu_cores": { "1511370076883": 2 }
    });
  });
});

describe("Reselect selector getRouteMetrics", () =>
  test("returns an object of the metrics that have a key containing the string `route`", () => {
    expect(getRoutesMetrics(state)).toEqual({
      "route/functionalroles/GET/errors.count": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/functionalroles/GET/in_throughput": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/functionalroles/GET/latency_ms.avg": {
        "1500416014314": 1.205696,
        "1500416029215": 1.205696,
        "1500416044215": 1.205696,
        "1500416059217": 1.205696,
        "1500416074215": 1.205696,
        "1500416089215": 1.205696,
        "1500416104216": 1.205696,
        "1500416119215": 1.205696,
        "1500416134216": 1.205696
      },
      "route/functionalroles/GET/latency_ms.count": {
        "1500416014314": 316,
        "1500416029215": 316,
        "1500416044215": 316,
        "1500416059217": 316,
        "1500416074215": 316,
        "1500416089215": 316,
        "1500416104216": 316,
        "1500416119215": 316,
        "1500416134216": 316
      },
      "route/functionalroles/GET/latency_ms.max": {
        "1500416014314": 17,
        "1500416029215": 17,
        "1500416044215": 17,
        "1500416059217": 17,
        "1500416074215": 17,
        "1500416089215": 17,
        "1500416104216": 17,
        "1500416119215": 17,
        "1500416134216": 17
      },
      "route/functionalroles/GET/latency_ms.min": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/functionalroles/GET/latency_ms.p50": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/functionalroles/GET/latency_ms.p90": {
        "1500416014314": 3,
        "1500416029215": 3,
        "1500416044215": 3,
        "1500416059217": 3,
        "1500416074215": 3,
        "1500416089215": 3,
        "1500416104216": 3,
        "1500416119215": 3,
        "1500416134216": 3
      },
      "route/functionalroles/GET/latency_ms.p95": {
        "1500416014314": 5,
        "1500416029215": 5,
        "1500416044215": 5,
        "1500416059217": 5,
        "1500416074215": 5,
        "1500416089215": 5,
        "1500416104216": 5,
        "1500416119215": 5,
        "1500416134216": 5
      },
      "route/functionalroles/GET/latency_ms.p99": {
        "1500416014314": 9,
        "1500416029215": 9,
        "1500416044215": 9,
        "1500416059217": 9,
        "1500416074215": 9,
        "1500416089215": 9,
        "1500416104216": 9,
        "1500416119215": 9,
        "1500416134216": 9
      },
      "route/functionalroles/GET/latency_ms.p9990": {
        "1500416014314": 17,
        "1500416029215": 17,
        "1500416044215": 17,
        "1500416059217": 17,
        "1500416074215": 17,
        "1500416089215": 17,
        "1500416104216": 17,
        "1500416119215": 17,
        "1500416134216": 17
      },
      "route/functionalroles/GET/latency_ms.p9999": {
        "1500416014314": 17,
        "1500416029215": 17,
        "1500416044215": 17,
        "1500416059217": 17,
        "1500416074215": 17,
        "1500416089215": 17,
        "1500416104216": 17,
        "1500416119215": 17,
        "1500416134216": 17
      },
      "route/functionalroles/GET/latency_ms.sum": {
        "1500416014314": 381,
        "1500416029215": 381,
        "1500416044215": 381,
        "1500416059217": 381,
        "1500416074215": 381,
        "1500416089215": 381,
        "1500416104216": 381,
        "1500416119215": 381,
        "1500416134216": 381
      },
      "route/functionalroles/GET/out_throughput": {
        "1500416014314": 1580,
        "1500416029215": 1580,
        "1500416044215": 1580,
        "1500416059217": 1580,
        "1500416074215": 1580,
        "1500416089215": 1580,
        "1500416104216": 1580,
        "1500416119215": 1580,
        "1500416134216": 1580
      },
      "route/functionalroles/GET/requests": {
        "1500416014314": 17725,
        "1500416029215": 17725,
        "1500416044215": 17725,
        "1500416059217": 17725,
        "1500416074215": 17725,
        "1500416089215": 17725,
        "1500416104216": 17725,
        "1500416119215": 17725,
        "1500416134216": 17725
      },
      "route/ping/GET/requests": {
        "1500416014314": 1,
        "1500416029215": 1,
        "1500416044215": 1,
        "1500416059217": 1,
        "1500416074215": 1,
        "1500416089215": 1,
        "1500416104216": 1,
        "1500416119215": 1,
        "1500416134216": 1
      },
      "route/ping/GET/response_size.count": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/ping/GET/status/200": {
        "1500416014314": 1,
        "1500416029215": 1,
        "1500416044215": 1,
        "1500416059217": 1,
        "1500416074215": 1,
        "1500416089215": 1,
        "1500416104216": 1,
        "1500416119215": 1,
        "1500416134216": 1
      },
      "route/ping/GET/status/2XX": {
        "1500416014314": 1,
        "1500416029215": 1,
        "1500416044215": 1,
        "1500416059217": 1,
        "1500416074215": 1,
        "1500416089215": 1,
        "1500416104216": 1,
        "1500416119215": 1,
        "1500416134216": 1
      },
      "route/ping/GET/time.count": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/ping/GET/time/200.count": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      },
      "route/ping/GET/time/2XX.count": {
        "1500416014314": 0,
        "1500416029215": 0,
        "1500416044215": 0,
        "1500416059217": 0,
        "1500416074215": 0,
        "1500416089215": 0,
        "1500416104216": 0,
        "1500416119215": 0,
        "1500416134216": 0
      }
    });
  }));

describe("Reselect selector getRouteTree", () =>
  test("returns a hierarchical representation of the keys nested under their corresponding routes and HTTP verbs", () => {
    expect(getRoutesTree(state)).toEqual({
      "/functionalroles": ["GET"],
      "/ping": ["GET"]
    });
  }));

// TODO: Mock out a state object for the Reselect selectors

// Note: You'll need to refactor generateSidebarCards to make this easier to test
// The goal should be to refactor out an intermediate selector
// that produces an array of props objects, but doesn't actually pass them into
// <SidebarCard>
describe("getDashboards", () => {
  xtest("takes a state object and returns state.dashboards", () => {});
});
describe("getMetrics", () => {
  xtest("takes a state object and returns state.instance.metrics", () => {});
});
describe("generateSidebarCardProps", () => {
  //TODO: Do we need a enhance the selector to provide a better error condition here?
  xtest("returns undefined if state.dashboards is empty", () => {});
  xtest("returns a title prop equal to value.name", () => {});
  xtest("returns key and href props equal to key prepended by a /", () => {});
  xtest("returns an icon prop equal to value.summaryCard.icon", () => {});
  // etc etc etc. Use Istanbul test reported to
});

describe("generateSidebarCards", () => {
  xtest("maps over an array of props generated by generateSidebarCardProps and passes them into <SidebarCards>", () => {});
  // Any possible error checking that should happen here?
});
