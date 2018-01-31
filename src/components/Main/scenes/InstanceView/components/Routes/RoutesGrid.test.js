import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import renderer from "react-test-renderer";
import NotFoundError from "components/Main/components/NotFoundError";

// Utilities
import mockState from "json/mockReduxState";

// Components
import RoutesGrid from "./index";

// Create a mock store and initialize with mock data
const store = configureMockStore()(mockState);

// Props that should be passed down to routes Table
const routesTableProps = {
  items: [
    {
      errorPercent: "0.000",
      errorsCount: 0,
      inThroughput: 0,
      latency50: 0,
      latency99: 9,
      outThroughput: 1580,
      requests: 17725,
      requestsPerSecond_dygraph: [
        [
          [new Date("2017-07-18T22:13:34.314Z"), 0],
          [new Date("2017-07-18T22:13:49.215Z"), 0],
          [new Date("2017-07-18T22:14:04.215Z"), 0],
          [new Date("2017-07-18T22:14:19.217Z"), 0],
          [new Date("2017-07-18T22:14:34.215Z"), 0],
          [new Date("2017-07-18T22:14:49.215Z"), 0],
          [new Date("2017-07-18T22:15:04.216Z"), 0],
          [new Date("2017-07-18T22:15:19.215Z"), 0],
          [new Date("2017-07-18T22:15:34.216Z"), 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 0, 0, 0, 0, 0, 0, 0],
      route: "/functionalroles",
      verb: "GET"
    },
    {
      errorPercent: "0.000",
      errorsCount: 0,
      inThroughput: 0,
      latency50: 0,
      latency99: 0,
      outThroughput: 0,
      requests: 1,
      requestsPerSecond_dygraph: [
        [
          [new Date("2017-07-18T22:13:34.314Z"), 0],
          [new Date("2017-07-18T22:13:49.215Z"), 0],
          [new Date("2017-07-18T22:14:04.215Z"), 0],
          [new Date("2017-07-18T22:14:19.217Z"), 0],
          [new Date("2017-07-18T22:14:34.215Z"), 0],
          [new Date("2017-07-18T22:14:49.215Z"), 0],
          [new Date("2017-07-18T22:15:04.216Z"), 0],
          [new Date("2017-07-18T22:15:19.215Z"), 0],
          [new Date("2017-07-18T22:15:34.216Z"), 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 0, 0, 0, 0, 0, 0, 0],
      route: "/ping",
      verb: "GET"
    }
  ],
  type: "Route"
};

let wrapper;

describe("RoutesGrid View", () => {
  beforeEach(() => {
    wrapper = mount(<RoutesGrid store={store} />).find("RoutesGrid");
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<RoutesGrid store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correct components", () => {
    expect(wrapper.find("TableToolbar")).toHaveLength(1);
    expect(wrapper.find("Table")).toHaveLength(1);
    expect(wrapper.find("ErrorBoundary")).toHaveLength(1);
  });

  test("renders NotFoundError when there are no routes", () => {
    // create state with no metrics and reconfigure mock store with new state
    const state = Object.assign({}, mockState, { instance: { metrics: {} } });
    const store = configureMockStore()(state);
    wrapper = mount(<RoutesGrid store={store} />);
    expect(wrapper.find(NotFoundError)).toHaveLength(1);
  });

  test("passes the correct props down to TableToolbar", () => {
    expect(wrapper.find("TableToolbar").props()).toMatchObject({
      searchInputProps: {
        filterString: "",
        searchPlaceholder: "Search Routes"
      },
      sortByProps: {
        sortByAttribute: "route",
        sortByOptions: [
          { label: "Route", value: "route" },
          { label: "Requests", value: "requests" },
          { label: "Error %", value: "errorPercent" },
          { label: "Latency 50%", value: "latency50" },
          { label: "Latency 99%", value: "latency99" }
        ]
      }
    });
  });

  test("passes the correct props down to Table", () => {
    expect(wrapper.find("Table").props()).toMatchObject(routesTableProps);
  });
});
