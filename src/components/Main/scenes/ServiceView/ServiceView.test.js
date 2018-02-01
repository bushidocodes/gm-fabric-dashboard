import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import renderer from "react-test-renderer";

import ServiceView from "./ServiceView";

const mockData = {
  instances: [
    { name: "serviceID1", start_time: 600000000000 },
    { name: "serviceID2", start_time: 300000000000 },
    { name: "serviceID3", start_time: 400000000000 }
  ],
  selectedServiceSlug: "cool-service-v1-0",
  serviceIsMetered: true,
  status: "stable"
};

// Wrap Service View in Memory Router to mock route props (history, match, location)
const RouterWrap = (
  <MemoryRouter>
    <Route render={props => <ServiceView {...props} {...mockData} />} />
  </MemoryRouter>
);

const tableProps = {
  items: [
    {
      name: "serviceID1",
      start_time: 600000000000
    },
    {
      name: "serviceID2",
      start_time: 300000000000
    },
    {
      name: "serviceID3",
      start_time: 400000000000
    }
  ],
  selectedServiceSlug: "cool-service-v1-0",
  serviceIsMetered: true,
  status: "stable",
  type: "Instance"
};

describe("Service View", () => {
  let wrapper = mount(RouterWrap);

  test("matches snapshot", () => {
    const tree = renderer.create(RouterWrap).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders all instances", () => {
    expect(wrapper.find("GMServiceTableLineItem").length).toBe(3);
    expect(wrapper.html().includes("serviceID1")).toBe(true);
    expect(wrapper.html().includes("serviceID2")).toBe(true);
    expect(wrapper.html().includes("serviceID3")).toBe(true);
  });

  test("passes the correct props down to TableToolbar", () => {
    expect(wrapper.find("TableToolbar").props()).toMatchObject({
      searchInputProps: {
        filterString: "",
        searchPlaceholder: "Search Instances"
      },
      sortByProps: {
        sortByAttribute: "name",
        sortByOptions: [
          { label: "Name", value: "name" },
          { label: "Uptime", value: "start_time" }
        ]
      }
    });
  });

  test("passes the correct props down to ThreadsTable", () => {
    expect(wrapper.find("Table").props()).toMatchObject(tableProps);
  });
});
