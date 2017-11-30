import state from "../../json/mockReduxState";

const { getFunctionsMetrics } = require.requireActual("./selectors");

describe("Reselect selector getFunctionsMetrics", () =>
  test("returns an array of keys starting with the substring function", () => {
    expect(getFunctionsMetrics(state)).toEqual({
      "function/CatalogStream/errors.count": {
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
      "function/CatalogStream/in_throughput": {
        "1500416014314": 227,
        "1500416029215": 227,
        "1500416044215": 227,
        "1500416059217": 227,
        "1500416074215": 227,
        "1500416089215": 227,
        "1500416104216": 227,
        "1500416119215": 227,
        "1500416134216": 227
      },
      "function/CatalogStream/latency_ms.avg": {
        "1500416014314": 1942.692308,
        "1500416029215": 1942.692308,
        "1500416044215": 1942.692308,
        "1500416059217": 1942.692308,
        "1500416074215": 1942.692308,
        "1500416089215": 1942.692308,
        "1500416104216": 1942.692308,
        "1500416119215": 1942.692308,
        "1500416134216": 1942.692308
      },
      "function/CatalogStream/latency_ms.count": {
        "1500416014314": 13,
        "1500416029215": 13,
        "1500416044215": 13,
        "1500416059217": 13,
        "1500416074215": 13,
        "1500416089215": 13,
        "1500416104216": 13,
        "1500416119215": 13,
        "1500416134216": 13
      },
      "function/CatalogStream/latency_ms.max": {
        "1500416014314": 3484,
        "1500416029215": 3484,
        "1500416044215": 3484,
        "1500416059217": 3484,
        "1500416074215": 3484,
        "1500416089215": 3484,
        "1500416104216": 3484,
        "1500416119215": 3484,
        "1500416134216": 3484
      },
      "function/CatalogStream/latency_ms.min": {
        "1500416014314": 600,
        "1500416029215": 600,
        "1500416044215": 600,
        "1500416059217": 600,
        "1500416074215": 600,
        "1500416089215": 600,
        "1500416104216": 600,
        "1500416119215": 600,
        "1500416134216": 600
      },
      "function/CatalogStream/latency_ms.p50": {
        "1500416014314": 1956,
        "1500416029215": 1956,
        "1500416044215": 1956,
        "1500416059217": 1956,
        "1500416074215": 1956,
        "1500416089215": 1956,
        "1500416104216": 1956,
        "1500416119215": 1956,
        "1500416134216": 1956
      },
      "function/CatalogStream/latency_ms.p90": {
        "1500416014314": 3469,
        "1500416029215": 3469,
        "1500416044215": 3469,
        "1500416059217": 3469,
        "1500416074215": 3469,
        "1500416089215": 3469,
        "1500416104216": 3469,
        "1500416119215": 3469,
        "1500416134216": 3469
      },
      "function/CatalogStream/latency_ms.p95": {
        "1500416014314": 3489,
        "1500416029215": 3489,
        "1500416044215": 3489,
        "1500416059217": 3489,
        "1500416074215": 3489,
        "1500416089215": 3489,
        "1500416104216": 3489,
        "1500416119215": 3489,
        "1500416134216": 3489
      },
      "function/CatalogStream/latency_ms.p99": {
        "1500416014314": 3484,
        "1500416029215": 3484,
        "1500416044215": 3484,
        "1500416059217": 3484,
        "1500416074215": 3484,
        "1500416089215": 3484,
        "1500416104216": 3484,
        "1500416119215": 3484,
        "1500416134216": 3484
      },
      "function/CatalogStream/latency_ms.p9990": {
        "1500416014314": 3484,
        "1500416029215": 3484,
        "1500416044215": 3484,
        "1500416059217": 3484,
        "1500416074215": 3484,
        "1500416089215": 3484,
        "1500416104216": 3484,
        "1500416119215": 3484,
        "1500416134216": 3484
      },
      "function/CatalogStream/latency_ms.p9999": {
        "1500416014314": 3484,
        "1500416029215": 3484,
        "1500416044215": 3484,
        "1500416059217": 3484,
        "1500416074215": 3484,
        "1500416089215": 3484,
        "1500416104216": 3484,
        "1500416119215": 3484,
        "1500416134216": 3484
      },
      "function/CatalogStream/latency_ms.sum": {
        "1500416014314": 25255,
        "1500416029215": 25255,
        "1500416044215": 25255,
        "1500416059217": 25255,
        "1500416074215": 25255,
        "1500416089215": 25255,
        "1500416104216": 25255,
        "1500416119215": 25255,
        "1500416134216": 25255
      },
      "function/CatalogStream/out_throughput": {
        "1500416014314": 2889,
        "1500416029215": 2889,
        "1500416044215": 2889,
        "1500416059217": 2889,
        "1500416074215": 2889,
        "1500416089215": 2889,
        "1500416104216": 2889,
        "1500416119215": 2889,
        "1500416134216": 2889
      },
      "function/CatalogStream/requests": {
        "1500416014314": 13,
        "1500416029215": 13,
        "1500416044215": 13,
        "1500416059217": 13,
        "1500416074215": 13,
        "1500416089215": 13,
        "1500416104216": 13,
        "1500416119215": 13,
        "1500416134216": 13
      },

      "function/OrderItem/errors.count": {
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
      "function/OrderItem/in_throughput": {
        "1500416014314": 225,
        "1500416029215": 225,
        "1500416044215": 225,
        "1500416059217": 225,
        "1500416074215": 225,
        "1500416089215": 225,
        "1500416104216": 225,
        "1500416119215": 225,
        "1500416134216": 225
      },
      "function/OrderItem/latency_ms.avg": {
        "1500416014314": 2398.615385,
        "1500416029215": 2398.615385,
        "1500416044215": 2398.615385,
        "1500416059217": 2398.615385,
        "1500416074215": 2398.615385,
        "1500416089215": 2398.615385,
        "1500416104216": 2398.615385,
        "1500416119215": 2398.615385,
        "1500416134216": 2398.615385
      },
      "function/OrderItem/latency_ms.count": {
        "1500416014314": 13,
        "1500416029215": 13,
        "1500416044215": 13,
        "1500416059217": 13,
        "1500416074215": 13,
        "1500416089215": 13,
        "1500416104216": 13,
        "1500416119215": 13,
        "1500416134216": 13
      },
      "function/OrderItem/latency_ms.max": {
        "1500416014314": 3565,
        "1500416029215": 3565,
        "1500416044215": 3565,
        "1500416059217": 3565,
        "1500416074215": 3565,
        "1500416089215": 3565,
        "1500416104216": 3565,
        "1500416119215": 3565,
        "1500416134216": 3565
      },
      "function/OrderItem/latency_ms.min": {
        "1500416014314": 1345,
        "1500416029215": 1345,
        "1500416044215": 1345,
        "1500416059217": 1345,
        "1500416074215": 1345,
        "1500416089215": 1345,
        "1500416104216": 1345,
        "1500416119215": 1345,
        "1500416134216": 1345
      },
      "function/OrderItem/latency_ms.p50": {
        "1500416014314": 2339,
        "1500416029215": 2339,
        "1500416044215": 2339,
        "1500416059217": 2339,
        "1500416074215": 2339,
        "1500416089215": 2339,
        "1500416104216": 2339,
        "1500416119215": 2339,
        "1500416134216": 2339
      },
      "function/OrderItem/latency_ms.p90": {
        "1500416014314": 3479,
        "1500416029215": 3479,
        "1500416044215": 3479,
        "1500416059217": 3479,
        "1500416074215": 3479,
        "1500416089215": 3479,
        "1500416104216": 3479,
        "1500416119215": 3479,
        "1500416134216": 3479
      },
      "function/OrderItem/latency_ms.p95": {
        "1500416014314": 3565,
        "1500416029215": 3565,
        "1500416044215": 3565,
        "1500416059217": 3565,
        "1500416074215": 3565,
        "1500416089215": 3565,
        "1500416104216": 3565,
        "1500416119215": 3565,
        "1500416134216": 3565
      },
      "function/OrderItem/latency_ms.p99": {
        "1500416014314": 3565,
        "1500416029215": 3565,
        "1500416044215": 3565,
        "1500416059217": 3565,
        "1500416074215": 3565,
        "1500416089215": 3565,
        "1500416104216": 3565,
        "1500416119215": 3565,
        "1500416134216": 3565
      },
      "function/OrderItem/latency_ms.p9990": {
        "1500416014314": 3565,
        "1500416029215": 3565,
        "1500416044215": 3565,
        "1500416059217": 3565,
        "1500416074215": 3565,
        "1500416089215": 3565,
        "1500416104216": 3565,
        "1500416119215": 3565,
        "1500416134216": 3565
      },
      "function/OrderItem/latency_ms.p9999": {
        "1500416014314": 3565,
        "1500416029215": 3565,
        "1500416044215": 3565,
        "1500416059217": 3565,
        "1500416074215": 3565,
        "1500416089215": 3565,
        "1500416104216": 3565,
        "1500416119215": 3565,
        "1500416134216": 3565
      },
      "function/OrderItem/latency_ms.sum": {
        "1500416014314": 31182,
        "1500416029215": 31182,
        "1500416044215": 31182,
        "1500416059217": 31182,
        "1500416074215": 31182,
        "1500416089215": 31182,
        "1500416104216": 31182,
        "1500416119215": 31182,
        "1500416134216": 31182
      },
      "function/OrderItem/out_throughput": {
        "1500416014314": 143,
        "1500416029215": 143,
        "1500416044215": 143,
        "1500416059217": 143,
        "1500416074215": 143,
        "1500416089215": 143,
        "1500416104216": 143,
        "1500416119215": 143,
        "1500416134216": 143
      },
      "function/OrderItem/requests": {
        "1500416014314": 13,
        "1500416029215": 13,
        "1500416044215": 13,
        "1500416059217": 13,
        "1500416074215": 13,
        "1500416089215": 13,
        "1500416104216": 13,
        "1500416119215": 13,
        "1500416134216": 13
      }
    });
  }));