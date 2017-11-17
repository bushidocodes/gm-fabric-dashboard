import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";

// Utilities
import mockState from "json/mockReduxState";
import { getDygraphOfValue } from "utils/dygraphs";

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
});
