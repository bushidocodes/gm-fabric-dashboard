import React from "react";
import { mount, render } from "enzyme";
import renderer from "react-test-renderer";

import FunctionsTableToolbar from "./FunctionsTableToolbar";

let wrapper;
const FunctionsTableToolbarWithProps = (
  <FunctionsTableToolbar
    filterString={"topics"}
    keyToSortBy={"route"}
    setFilterString={jest.fn()}
    setKeyToSortBy={jest.fn()}
  />
);

describe("Go Instance Functions View: <FunctionsTableToolbar />", () => {
  beforeEach(() => {
    wrapper = mount(FunctionsTableToolbarWithProps);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(FunctionsTableToolbarWithProps).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("calls setFilterString on input change", () => {
    wrapper
      .find({ type: "search" })
      .simulate("change", { target: { value: "Catalog" } });
    expect(wrapper.props().setFilterString).toHaveBeenCalled();
  });

  // simulate dropdown selection change using onChange
  test("calls setKeyToSortBy on dropdown selection change", () => {
    wrapper
      .find("Select")
      .props()
      .onChange("Function");
    expect(wrapper.props().setKeyToSortBy).toHaveBeenCalled();
  });
});
