import React from "react";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";

import Table from "./index.js";
import TableLineItem from "./components/TableLineItem";
import GMServiceTableLineItem from "./components/GMServiceTableLineItem";
import TableColHeader from "components/Main/components/TableColHeader";
import TableColLatencyHeader from "components/Main/components/TableColLatencyHeader";

let wrapper;
let routesProps = {
  type: "Route",
  items: [
    {
      errorPercent: "0.000",
      errorsCount: 20,
      inThroughput: 0,
      latency50: 0,
      latency99: 3,
      outThroughput: 29945110,
      requests: 399334,
      requestsPerSecond_dygraph: [
        [
          ["Mon Nov 13 2017 17:22:58 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:03 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:08 GMT-0500 (EST)", 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 25, 430, 1256],
      route: "/categories",
      verb: "GET"
    },
    {
      errorPercent: "0.000",
      errorsCount: 40,
      inThroughput: 0,
      latency50: 0,
      latency99: 0,
      outThroughput: 29945110,
      requests: 0,
      requestsPerSecond_dygraph: [
        [
          ["Mon Nov 13 2017 17:22:58 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:03 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:08 GMT-0500 (EST)", 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 25, 430, 1256],
      route: "/topics",
      verb: "GET"
    }
  ]
};

let instancesProps = {
  items: [
    { name: "26d7cmoduw8w000000000", start_time: 134056421868 },
    { name: "52ikspsvqpo0000000000", start_time: 657503172351 },

    { name: "5uws9t7wpac0000000000", start_time: 31280519413 }
  ],
  type: "Instance",
  serviceName:
    "Authentication Management Transfer Odrive Gateway Statistics Up2 Channel",
  serviceVersion: "2.3",
  status: "Warning"
};

describe("Table component", () => {
  beforeEach(() => {
    wrapper = mount(<Table {...routesProps} />);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<Table {...routesProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correct header texts", () => {
    expect(
      wrapper
        .find(TableColHeader)
        .at(0)
        .text()
    ).toBe("Route");
    expect(
      wrapper
        .find(TableColHeader)
        .at(1)
        .text()
    ).toBe("Requests/sec");
    expect(
      wrapper
        .find(TableColHeader)
        .at(2)
        .text()
    ).toBe("Requests");
    expect(
      wrapper
        .find(TableColHeader)
        .at(3)
        .text()
    ).toBe("Error %");
    expect(wrapper.find(TableColLatencyHeader).text()).toBe("Latency50%99%");
  });

  test("when provided routes data, renders <TableLineItem />", () => {
    expect(wrapper.find(TableLineItem).length).toEqual(2);
    expect(wrapper.find(GMServiceTableLineItem).length).toEqual(0);
  });
  test("passes correct data to <TableLineItem />", () => {
    const firstTableLine = wrapper.find(TableLineItem).at(0);
    const secondTableLine = wrapper.find(TableLineItem).at(1);

    expect(firstTableLine.props()).toEqual({
      item: "/categories",
      errorPercent: "0.000",
      latency50: 0,
      latency99: 3,
      relativeReqPercent: 100,
      requests: 399334,
      requestsPerSecond_dygraph: [
        [
          ["Mon Nov 13 2017 17:22:58 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:03 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:08 GMT-0500 (EST)", 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 25, 430, 1256],
      verb: "GET"
    });
    expect(secondTableLine.props()).toEqual({
      item: "/topics",
      errorPercent: "0.000",
      latency50: 0,
      latency99: 0,
      relativeReqPercent: 0,
      requests: 0,
      requestsPerSecond_dygraph: [
        [
          ["Mon Nov 13 2017 17:22:58 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:03 GMT-0500 (EST)", 0],
          ["Mon Nov 13 2017 17:23:08 GMT-0500 (EST)", 0]
        ],
        { labels: ["time", "Requests"] }
      ],
      requestsPerSecond_sparkline: [0, 25, 430, 1256],
      verb: "GET"
    });
  });
});

describe("Table component with instances prop", () => {
  let firstGMServiceTableLineItem;
  beforeEach(() => {
    wrapper = shallow(<Table {...instancesProps} />);
    firstGMServiceTableLineItem = wrapper
      .dive()
      .find(GMServiceTableLineItem)
      .at(0);
  });

  test("when provided instances data, renders <GMServiceTableLineItem />", () => {
    expect(wrapper.find(GMServiceTableLineItem).length).toEqual(3);
    expect(wrapper.find(TableLineItem).length).toEqual(0);
  });

  test("passes correct props to <GMServiceTableLineItem />", () => {
    expect(firstGMServiceTableLineItem.props()).toHaveProperty(
      "path",
      "/Authentication Management Transfer Odrive Gateway Statistics Up2 Channel/2.3/26d7cmoduw8w000000000"
    );
  });
});
