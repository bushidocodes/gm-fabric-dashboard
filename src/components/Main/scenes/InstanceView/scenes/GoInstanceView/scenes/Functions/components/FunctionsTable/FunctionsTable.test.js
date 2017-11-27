import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import FunctionsTable from "./";
import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableBody from "components/Main/components/TableBody";

let wrapper;
const FunctionsTableWithProps = (
  <FunctionsTable
    funcs={[
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
        func: "CatalogStream"
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
        func: "OrderItem"
      }
    ]}
  />
);

describe("Go Instance Routes View: <FunctionsTable />", () => {
  beforeEach(() => {
    wrapper = mount(FunctionsTableWithProps);
  });

  test("renders styled-components table header and body", () => {
    expect(wrapper.find(Table).length).toBe(1);
    expect(wrapper.find(TableHeader).length).toBe(1);
    expect(wrapper.find(TableColHeader).length).toBe(6);
    expect(wrapper.find(TableBody).length).toBe(1);
  });

  test("renders correct header texts", () => {
    expect(
      wrapper
        .find(TableColHeader)
        .at(0)
        .text()
    ).toBe("Function");
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
    expect(
      wrapper
        .find(TableColHeader)
        .at(4)
        .text()
    ).toBe("Latency 50%");
    expect(
      wrapper
        .find(TableColHeader)
        .at(5)
        .text()
    ).toBe("Latency 99%");
  });

  test("Call <FunctionsTableLineItem /> correct number of times", () => {
    expect(wrapper.find(`FunctionsTableLineItem`).length).toEqual(2);
    expect(wrapper.find(`FunctionsTableLineItem`).exists()).toEqual(true);
  });

  test("passes correct data to <FunctionsTableLineItem />", () => {
    const firstTableLine = wrapper.find(`FunctionsTableLineItem`).at(0);
    const secondTableLine = wrapper.find(`FunctionsTableLineItem`).at(1);

    expect(firstTableLine.props()).toMatchObject({
      errorPercent: "0.000",
      errorsCount: 20,
      func: "CatalogStream",
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
      requestsPerSecond_sparkline: [0, 25, 430, 1256]
    });

    expect(secondTableLine.props()).toMatchObject({
      errorPercent: "0.000",
      errorsCount: 40,
      func: "OrderItem",
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
      requestsPerSecond_sparkline: [0, 25, 430, 1256]
    });
  });
});

describe("Go Instance Routes View: <FunctionsTable /> Snapshot", () => {
  test("renders snapshot correctly", () => {
    const tree = renderer.create(FunctionsTableWithProps).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
