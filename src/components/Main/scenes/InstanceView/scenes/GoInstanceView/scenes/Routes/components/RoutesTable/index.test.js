import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import RoutesTable from "./";
import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableBody from "components/Main/components/TableBody";

let wrapper;

const RoutesTableWithProps = (
  <RoutesTable
    routes={[
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
    ]}
  />
);

describe("Go Instance Routes View: <RoutesTable />", () => {
  beforeEach(() => {
    wrapper = mount(RoutesTableWithProps);
  });

  test("renders styled-components table header and body", () => {
    expect(wrapper.find(Table).length).toBe(1);
    expect(wrapper.find(TableHeader).length).toBe(1);
    expect(wrapper.find(TableColHeader).length).toBe(6);
    expect(wrapper.find(TableBody).length).toBe(1);
  });

  test("renders correct header texts", () => {
    expect(wrapper.html().includes("Route")).toBe(true);
    expect(wrapper.html().includes("Requests/s")).toBe(true);
    expect(wrapper.html().includes("Requests")).toBe(true);
    expect(wrapper.html().includes("Latency")).toBe(true);
  });

  test("Call <RoutesTableLineItem /> correct number of times", () => {
    expect(wrapper.find(`RoutesTableLineItem`).length).toEqual(2);
    expect(wrapper.find(`RoutesTableLineItem`).exists()).toEqual(true);
  });

  test("passes correct data to <RoutesTableLineItem />", () => {
    const firstTableLine = wrapper.find(`RoutesTableLineItem`).at(0);
    const secondTableLine = wrapper.find(`RoutesTableLineItem`).at(1);

    expect(firstTableLine.props().errorsCount).toEqual(20);
    expect(firstTableLine.props().errorPercent).toEqual("0.000");
    expect(firstTableLine.props().latency50).toEqual(0);
    expect(firstTableLine.props().latency99).toEqual(3);
    expect(firstTableLine.props().relativeReqPercent).toEqual(100);
    expect(firstTableLine.props().requests).toEqual(399334);
    expect(firstTableLine.props().requestsPerSecond_dygraph).toEqual([
      [
        ["Mon Nov 13 2017 17:22:58 GMT-0500 (EST)", 0],
        ["Mon Nov 13 2017 17:23:03 GMT-0500 (EST)", 0],
        ["Mon Nov 13 2017 17:23:08 GMT-0500 (EST)", 0]
      ],
      { labels: ["time", "Requests"] }
    ]);
    expect(firstTableLine.props().requestsPerSecond_sparkline).toEqual([
      0,
      25,
      430,
      1256
    ]);
    expect(firstTableLine.props().route).toEqual("/categories ");
    expect(firstTableLine.props().verb).toEqual("GET");

    expect(secondTableLine.props().errorsCount).toEqual(40);
    expect(secondTableLine.props().relativeReqPercent).toEqual(0);
  });
});

describe("Go Instance Routes View: <RoutesTable /> Snapshot", () => {
  test("renders snapshot correctly", () => {
    const tree = renderer.create(RoutesTableWithProps).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
