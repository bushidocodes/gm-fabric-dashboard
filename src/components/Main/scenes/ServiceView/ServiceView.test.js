import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import ServiceView from "./ServiceView";

const mockData = {
  serviceName: "Cool Service",
  serviceVersion: "1.0",
  status: "stable",
  instances: [
    { name: "serviceID1", start_time: 600000000000 },
    { name: "serviceID2", start_time: 300000000000 },
    { name: "serviceID3", start_time: 400000000000 }
  ]
};

// Wrap Service View in Memory Router to mock route props (history, match, location)
const RouterWrap = (
  <MemoryRouter>
    <Route render={props => <ServiceView {...props} {...mockData} />} />
  </MemoryRouter>
);

describe("Service View", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(RouterWrap);
  });

  test("renders all instances", () => {
    expect(wrapper.find("GMServiceTableLineItem").length).toBe(3);
    expect(wrapper.html().includes("serviceID1")).toBe(true);
    expect(wrapper.html().includes("serviceID2")).toBe(true);
    expect(wrapper.html().includes("serviceID3")).toBe(true);
  });

  test("filters by query string", () => {
    wrapper
      .find("ServiceView")
      .instance()
      .setFilterString("ID1");

    expect(wrapper.html().includes("serviceID1")).toBe(true);
    expect(wrapper.html().includes("serviceID2")).toBe(false);
    expect(wrapper.html().includes("serviceID3")).toBe(false);
  });

  // For the following tests, I am finding the index of each instance name in the html
  // and then asserting the correct order based on those positions
  test("sorts by start time in asc order", () => {
    // Set the sort by attribute to start_time
    wrapper
      .find("ServiceView")
      .instance()
      .setSortByAttribute("start_time");

    const positionOf_serviceID1 = wrapper.html().indexOf("serviceID1");
    const positionOf_serviceID2 = wrapper.html().indexOf("serviceID2");
    const positionOf_serviceID3 = wrapper.html().indexOf("serviceID3");

    // Expected order is serviceID2, serviceID3, serviceID1
    expect(positionOf_serviceID2).toBeLessThan(positionOf_serviceID3);
    expect(positionOf_serviceID3).toBeLessThan(positionOf_serviceID1);
  });

  test("sorts by start time in desc order", () => {
    let instance = wrapper.find("ServiceView").instance();

    // Setting the sortByAttribute twice should reverse the order
    instance.setSortByAttribute("start_time");
    instance.setSortByAttribute("start_time");

    const positionOf_serviceID1 = wrapper.html().indexOf("serviceID1");
    const positionOf_serviceID2 = wrapper.html().indexOf("serviceID2");
    const positionOf_serviceID3 = wrapper.html().indexOf("serviceID3");

    // Expected order is serviceID1, serviceID3, serviceID2
    expect(positionOf_serviceID1).toBeLessThan(positionOf_serviceID3);
    expect(positionOf_serviceID3).toBeLessThan(positionOf_serviceID2);
  });

  test("sorts by name in asc order", () => {
    // We do not need to set the sortByAttribute here because "name" is the default

    const positionOf_serviceID1 = wrapper.html().indexOf("serviceID1");
    const positionOf_serviceID2 = wrapper.html().indexOf("serviceID2");
    const positionOf_serviceID3 = wrapper.html().indexOf("serviceID3");

    // Expected order is serviceID1, serviceID2, serviceID3
    expect(positionOf_serviceID1).toBeLessThan(positionOf_serviceID2);
    expect(positionOf_serviceID2).toBeLessThan(positionOf_serviceID3);
  });

  test("sorts by name in desc order", () => {
    // Set the sort by attribute again to reverse order
    wrapper
      .find("ServiceView")
      .instance()
      .setSortByAttribute("name");

    const positionOf_serviceID1 = wrapper.html().indexOf("serviceID1");
    const positionOf_serviceID2 = wrapper.html().indexOf("serviceID2");
    const positionOf_serviceID3 = wrapper.html().indexOf("serviceID3");

    // Expected order is serviceID3, serviceID2, serviceID1
    expect(positionOf_serviceID3).toBeLessThan(positionOf_serviceID2);
    expect(positionOf_serviceID2).toBeLessThan(positionOf_serviceID1);
  });
});
