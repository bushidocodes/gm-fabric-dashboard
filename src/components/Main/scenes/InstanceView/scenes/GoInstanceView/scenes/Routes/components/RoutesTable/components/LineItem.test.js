import React from "react";
import RoutesTableLineItem from "./LineItem";

import { mount, shallow } from "enzyme";
import TableRow from "components/Main/components/TableRow";
import TableCol from "components/Main/components/TableCol";
import TableColVizBar from "components/Main/components/TableColVizBar";
import SparklineCol from "components/Main/components/SparklineCol";
import TableDrawerCollapse from "components/Main/components/TableDrawerCollapse";

let wrapper;
const mockedEvent = {
  target: {
    className: "TableRow",
    blur: () => {}
  }
};

describe("Go Instance Routes View: <RoutesTableLineItem/>", () => {
  beforeEach(() => {
    wrapper = mount(
      <RoutesTableLineItem
        errorPercent={"10.000"}
        errorsCount={32}
        latency50={445}
        latency99={35}
        relativeReqPercent={20}
        requests={14333}
        requestsPerSecond_dygraph={[0, 1, 5, 30, 56]}
        requestsPerSecond_sparkline={[0, 25, 430, 1256]}
        route={"/categories"}
        verb={"GET"}
      />
    );
  });

  test("set props", () => {
    expect(wrapper.props().errorPercent).toBe("10.000");
    expect(wrapper.props().errorsCount).toBe(32);
    expect(wrapper.props().latency50).toBe(445);
    expect(wrapper.props().latency99).toBe(35);
    expect(wrapper.props().relativeReqPercent).toBe(20);
    expect(wrapper.props().requests).toBe(14333);
    expect(wrapper.props().requestsPerSecond_dygraph).toEqual([
      0,
      1,
      5,
      30,
      56
    ]);
    expect(wrapper.props().requestsPerSecond_sparkline).toEqual([
      0,
      25,
      430,
      1256
    ]);
    expect(wrapper.props().route).toEqual("/categories");
    expect(wrapper.props().verb).toEqual("GET");
    wrapper.setProps({ latency50: 40 });
    expect(wrapper.props().latency50).toEqual(40);
  });

  test("renders styled-components", () => {
    expect(wrapper.find(TableRow).length).toBe(1);
    expect(wrapper.find(TableColVizBar).length).toBe(1);
    expect(wrapper.find(SparklineCol).length).toBe(1);
    expect(wrapper.find(TableCol).length).toBe(4);
    expect(wrapper.find(TableDrawerCollapse).length).toBe(1);
  });

  // use 'shallow' instead of mount for instance tests
  test("should toggle row's open/closed state when row is clicked", () => {
    wrapper = shallow(
      <RoutesTableLineItem
        errorPercent={"10.000"}
        errorsCount={32}
        latency50={445}
        latency99={35}
        relativeReqPercent={20}
        requests={14333}
        requestsPerSecond_dygraph={[0, 1, 5, 30, 56]}
        requestsPerSecond_sparkline={[0, 25, 430, 1256]}
        route={"/categories"}
        verb={"GET"}
      />
    );

    const row = wrapper.find(TableRow);
    row.simulate("click", mockedEvent);
    expect(wrapper.state().isOpen).toEqual(true);

    row.simulate("click", mockedEvent);
    expect(wrapper.state().isOpen).toEqual(false);
  });

  test("should toggle drawer's open/closed state when row is clicked", () => {
    wrapper = shallow(
      <RoutesTableLineItem
        errorPercent={"10.000"}
        errorsCount={32}
        latency50={445}
        latency99={35}
        relativeReqPercent={20}
        requests={14333}
        requestsPerSecond_dygraph={[0, 1, 5, 30, 56]}
        requestsPerSecond_sparkline={[0, 25, 430, 1256]}
        route={"/categories"}
        verb={"GET"}
      />
    );

    const row = wrapper.find(TableRow);
    row.simulate("click", mockedEvent);
    const drawer = wrapper.find(TableDrawerCollapse);

    expect(wrapper.state().isOpen).toEqual(true);
    expect(drawer.props().isOpened).toBe(true);
  });

  test("renders all data in line item", () => {
    expect(wrapper.html().includes("GET")).toBe(true);
    expect(wrapper.html().includes("/categories")).toBe(true);
    expect(wrapper.html().includes("10.000%")).toBe(true);
    expect(wrapper.html().includes(32)).toBe(true);
    expect(wrapper.html().includes(445)).toBe(true);
    expect(wrapper.html().includes(35)).toBe(true);
    expect(wrapper.html().includes(14333)).toBe(true);
  });
});
