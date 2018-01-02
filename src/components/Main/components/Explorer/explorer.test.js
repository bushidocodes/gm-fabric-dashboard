import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";

// Utilities
import mockState from "json/mockReduxState";

// Components
import Explorer from "./index.js";
import ViewExplorer from "./components/ViewExplorer";
import MetricsList from "./components/MetricsList";
import MetricsGraphDisplay from "./components/MetricsGraphDisplay";

// Create a mock store and initialize with mock data
const store = configureStore()(mockState);

// Wrap Explorer in Memory Router to mock route props (history, match, location)
const RouterWrap = (
  <Provider store={store}>
    <MemoryRouter>
      <Route render={props => <Explorer {...props} />} />
    </MemoryRouter>
  </Provider>
);

let wrapper;

let mockKeys = [
  "http/connections",
  "finagle/timer/deviation_ms.p50",
  "http/response_payload_bytes.count",
  "jvm/postGC/PS_Survivor_Space/used",
  "http/request_payload_bytes.count",
  "jvm/thread/peak_count",
  "finagle/timer/deviation_ms.sum",
  "http/request_latency_ms.count",
  "jvm/classes/current_loaded",
  "jvm/mem/current/Compressed_Class_Space/max",
  "status/200",
  "jvm/mem/current/PS_Survivor_Space/used",
  "jvm/mem/postGC/PS_Eden_Space/used",
  "http/success",
  "jvm/heap/max",
  "jvm/gc/eden/pause_msec.count",
  "jvm/postGC/PS_Eden_Space/used",
  "http/connection_duration.count",
  "time/200.count"
];

let mockMetrics = {
  "http/connections": {
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
  "finagle/timer/deviation_ms.p50": {
    "1500416014314": 10,
    "1500416029215": 10,
    "1500416044215": 10,
    "1500416059217": 10,
    "1500416074215": 10,
    "1500416089215": 10,
    "1500416104216": 10,
    "1500416119215": 10,
    "1500416134216": 10
  },
  "http/response_payload_bytes.count": {
    "1500416014314": 342,
    "1500416029215": 454,
    "1500416044215": 1256,
    "1500416059217": 333,
    "1500416074215": 444,
    "1500416089215": 2222,
    "1500416104216": 562,
    "1500416119215": 457887,
    "1500416134216": 123525
  },
  "jvm/postGC/PS_Survivor_Space/used": {
    "1500416014314": 163840,
    "1500416029215": 163840,
    "1500416044215": 163840,
    "1500416059217": 163840,
    "1500416074215": 163840,
    "1500416089215": 163840,
    "1500416104216": 163840,
    "1500416119215": 163840,
    "1500416134216": 163840
  },
  "http/request_payload_bytes.count": {
    "1500416014314": 47474,
    "1500416029215": 0,
    "1500416044215": 455,
    "1500416059217": 0,
    "1500416074215": 111,
    "1500416089215": 0,
    "1500416104216": 0,
    "1500416119215": 77,
    "1500416134216": 0
  },
  "jvm/thread/peak_count": {
    "1500416014314": 46,
    "1500416029215": 46,
    "1500416044215": 46,
    "1500416059217": 46,
    "1500416074215": 46,
    "1500416089215": 46,
    "1500416104216": 46,
    "1500416119215": 46,
    "1500416134216": 46
  },
  "finagle/timer/deviation_ms.sum": {
    "1500416014314": 28380,
    "1500416029215": 28380,
    "1500416044215": 27820,
    "1500416059217": 27820,
    "1500416074215": 27820,
    "1500416089215": 27820,
    "1500416104216": 30001,
    "1500416119215": 30001,
    "1500416134216": 30001
  },
  "http/request_latency_ms.count": {
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
  "jvm/classes/current_loaded": {
    "1500416014314": 7728,
    "1500416029215": 7728,
    "1500416044215": 7728,
    "1500416059217": 7728,
    "1500416074215": 7728,
    "1500416089215": 7728,
    "1500416104216": 7728,
    "1500416119215": 7728,
    "1500416134216": 7728
  },
  "jvm/mem/current/Compressed_Class_Space/max": {
    "1500416014314": 1073741824,
    "1500416029215": 107374,
    "1500416044215": 1073741824,
    "1500416059217": 1071824,
    "1500416074215": 107324,
    "1500416089215": 107324,
    "1500416104216": 107324,
    "1500416119215": 107324,
    "1500416134216": 1073741824
  },
  "status/200": {
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
  "jvm/mem/current/PS_Survivor_Space/used": {
    "1500416014314": 1640,
    "1500416029215": 1640,
    "1500416044215": 1640,
    "1500416059217": 1640,
    "1500416074215": 1640,
    "1500416089215": 1640,
    "1500416104216": 163840,
    "1500416119215": 163840,
    "1500416134216": 163840
  },
  "jvm/mem/postGC/PS_Eden_Space/used": {
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
  "http/success": {
    "1500416014314": 2,
    "1500416029215": 2,
    "1500416044215": 2,
    "1500416059217": 2,
    "1500416074215": 2,
    "1500416089215": 2,
    "1500416104216": 2,
    "1500416119215": 2,
    "1500416134216": 2
  },
  "jvm/heap/max": {
    "1500416014314": 3817865216,
    "1500416029215": 3817865216,
    "1500416044215": 3817865216,
    "1500416059217": 3817865216,
    "1500416074215": 3817865216,
    "1500416089215": 3817865216,
    "1500416104216": 3817865216,
    "1500416119215": 3817865216,
    "1500416134216": 3817865216
  },
  "jvm/gc/eden/pause_msec.count": {
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
  "jvm/postGC/PS_Eden_Space/used": {
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
  "http/connection_sent_bytes.count": {
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
  "http/connection_duration.count": {
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
  "time/200.count": {
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
};

describe("Explorer View", () => {
  beforeEach(() => {
    wrapper = mount(RouterWrap);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(RouterWrap).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders correct components", () => {
    // react components
    expect(wrapper.find("ErrorBoundary")).toHaveLength(1);
    expect(wrapper.find("Inspector")).toHaveLength(1);
    // styled-components
    expect(wrapper.find(ViewExplorer)).toHaveLength(1);
    expect(wrapper.find(MetricsList)).toHaveLength(1);
    expect(wrapper.find(MetricsGraphDisplay)).toHaveLength(1);
  });

  test("passes the correct props down to Inspector", () => {
    const instance = wrapper.find("Explorer").instance();
    const expectedProps = {
      data: instance.props.keys,
      onClick: instance.onClick,
      onSearch: instance.onSearch,
      searchQuery: "",
      tabIndex: 0
    };
    expect(wrapper.find("Inspector").props()).toMatchObject(expectedProps);
  });
});

describe("Explorer Instance Methods", () => {
  let instance;

  beforeEach(() => {
    instance = mount(RouterWrap)
      .find("Explorer")
      .instance();
  });

  test("_pushHistory sets state and pushes queryString to browser history", () => {
    instance._pushHistory("jvm");

    expect(instance.state.lastPushedQueryString).toBe("jvm");
    expect(instance.props.history.location.search).toBe("?jvm");
    expect(instance.props.history).toHaveLength(2);
  });

  test("popAndDecodeHistory parses the query string and sets local state", () => {
    instance.popAndDecodeHistory("?searchQuery=deviation");
    expect(instance.state.searchQuery).toBe("deviation");
  });

  test("onSearch sets local state with user's search query", () => {
    instance.onSearch("status");
    expect(instance.state.searchQuery).toBe("status");
  });

  test("onChange sets local state with user's hide filter", () => {
    instance.onChange(true, "hideZeroMetric");
    expect(instance.state.hideZeroMetric).toBe(true);

    instance.onChange(false, "hideZeroMetric");
    expect(instance.state.hideZeroMetric).toBe(false);

    instance.onChange(true, "hideStaticMetric");
    expect(instance.state.hideStaticMetric).toBe(true);

    instance.onChange(false, "hideStaticMetric");
    expect(instance.state.hideStaticMetric).toBe(false);
  });

  test("onClick escapes slashes and calls _appendToQueryString", () => {
    instance.onClick("HTTP/requests");
    expect(instance.props.history.location.search).toBe(
      "?selectedMetric=HTTP%252Frequests"
    );
  });

  test("_appendToQueryString takes a object with key value pairs and updates them on the query string", () => {
    instance._appendToQueryString({ selectedMetric: "HTTP%2Frequests" });
    expect(instance.props.history.location.search).toBe(
      "?selectedMetric=HTTP%252Frequests"
    );
    instance._appendToQueryString({ selectedMetric: "RPC%2Frequests" });
    expect(instance.props.history.location.search).toBe(
      "?selectedMetric=RPC%252Frequests"
    );
    expect(instance.props.history.location.search).not.toBe(
      "?selectedMetric=HTTP%252Frequests"
    );
  });

  test("hideKeys hides all metrics with static values when hideStaticMetric is set to true", () => {
    instance.setState({ hideStaticMetric: true });
    expect(instance.hideKeys(mockKeys, mockMetrics)).toEqual([
      "http/response_payload_bytes.count",
      "http/request_payload_bytes.count",
      "finagle/timer/deviation_ms.sum",
      "jvm/mem/current/Compressed_Class_Space/max",
      "jvm/mem/current/PS_Survivor_Space/used"
    ]);
  });
  test("hideKeys hides metrics with zero values when only hideZeroMetric is set to true", () => {
    instance.setState({ hideStaticMetric: false, hideZeroMetric: true });
    expect(instance.hideKeys(mockKeys, mockMetrics)).toEqual([
      "finagle/timer/deviation_ms.p50",
      "http/response_payload_bytes.count",
      "jvm/postGC/PS_Survivor_Space/used",
      "http/request_payload_bytes.count",
      "jvm/thread/peak_count",
      "finagle/timer/deviation_ms.sum",
      "jvm/classes/current_loaded",
      "jvm/mem/current/Compressed_Class_Space/max",
      "status/200",
      "jvm/mem/current/PS_Survivor_Space/used",
      "http/success",
      "jvm/heap/max"
    ]);
  });
  test("hideKeys does not filter metrics when both filter is set to false", () => {
    instance.setState({ hideStaticMetric: false, hideZeroMetric: false });
    expect(instance.hideKeys(mockKeys, mockMetrics)).toEqual(mockKeys);
  });
});
