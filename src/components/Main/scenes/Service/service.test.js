import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import GMServiceView from "./index";

const mockData = {
  serviceName: "Cool Service",
  serviceVersion: "1.0",
  status: "stable",
  instances: [
    { name: "1ridkelvyaw", start_time: 600000000000 },
    { name: "6ojc5ulukgw", start_time: 300000000000 },
    { name: "7b1ry66rkwg", start_time: 400000000000 }
  ]
};

// Wrap Service View in Memory Router to mock route props (history, match, location)
const RouterWrap = (
  <MemoryRouter>
    <Route render={props => <GMServiceView {...props} {...mockData} />} />
  </MemoryRouter>
);

describe("Service View", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RouterWrap);
  });

  test("renders all instances", () => {
    expect(wrapper.find("GMServiceTableLineItem").length).toBe(3);
    expect(wrapper.html().includes("1ridkelvyaw")).toBe(true);
    expect(wrapper.html().includes("6ojc5ulukgw")).toBe(true);
    expect(wrapper.html().includes("7b1ry66rkwg")).toBe(true);
  });

  test("filters by query string", () => {
    wrapper
      .find("GMServiceView")
      .instance()
      .setFilterString("1rid");

    expect(wrapper.html().includes("1ridkelvyaw")).toBe(true);
    expect(wrapper.html().includes("6ojc5ulukgw")).toBe(false);
    expect(wrapper.html().includes("7b1ry66rkwg")).toBe(false);
  });

  // For the following tests, I am finding the index of each instance name in the html
  // and then asserting the correct order based on those positions
  test("sorts by start time", () => {
    wrapper
      .find("GMServiceView")
      .instance()
      .setSortByAttribute("start_time");

    const positionOf_1ridkelvyaw = wrapper.html().indexOf("1ridkelvyaw");
    const positionOf_6ojc5ulukgw = wrapper.html().indexOf("6ojc5ulukgw");
    const positionOf_7b1ry66rkwg = wrapper.html().indexOf("7b1ry66rkwg");

    // Expected order is 6ojc5ulukgw, 7b1ry66rkwg, 1ridkelvyaw
    expect(positionOf_6ojc5ulukgw).toBeLessThan(positionOf_7b1ry66rkwg);
    expect(positionOf_7b1ry66rkwg).toBeLessThan(positionOf_1ridkelvyaw);
  });

  test("sorts by name", () => {
    wrapper
      .find("GMServiceView")
      .instance()
      .setSortByAttribute("name");

    const positionOf_1ridkelvyaw = wrapper.html().indexOf("1ridkelvyaw");
    const positionOf_6ojc5ulukgw = wrapper.html().indexOf("6ojc5ulukgw");
    const positionOf_7b1ry66rkwg = wrapper.html().indexOf("7b1ry66rkwg");

    // Expected order is 1ridkelvyaw, 6ojc5ulukgw, 7b1ry66rkwg
    expect(positionOf_1ridkelvyaw).toBeLessThan(positionOf_6ojc5ulukgw);
    expect(positionOf_6ojc5ulukgw).toBeLessThan(positionOf_7b1ry66rkwg);
  });
});
