import React from "react";
import { mount, render } from "enzyme";
import renderer from "react-test-renderer";

import RoutesTableToolbar from "./RoutesTableToolbar";

const RoutesTableToolbarWithProps = (
  <RoutesTableToolbar
    filterString={"topics"}
    keyToSortBy={"route"}
    setFilterString={jest.fn(string =>
      console.log(`setFilterString called with: ${string}`)
    )}
    setKeyToSortBy={jest.fn(() => console.log("setKeyToSortBy"))}
  />
);

describe("Go Instance Routes View: <RoutesTableToolbar />", () => {
  test("matches snapshot", () => {
    const tree = renderer.create(RoutesTableToolbarWithProps).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("calls setFilterString on input change", () => {
    let wrapper = mount(RoutesTableToolbarWithProps);
    wrapper
      .find({ type: "search" })
      .simulate("change", { target: { value: "category" } });
    expect(wrapper.props().setFilterString).toHaveBeenCalled();
  });

  // simulate dropdown selection change using onChange
  test("calls setKeyToSortBy on dropdown selection change", () => {
    let wrapper = mount(RoutesTableToolbarWithProps);

    wrapper
      .find("Select")
      .props()
      .onChange("latency50");
    expect(wrapper.props().setKeyToSortBy).toHaveBeenCalled();
  });
});
