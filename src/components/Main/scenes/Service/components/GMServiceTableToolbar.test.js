import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import GMServiceTableToolbar from "./GMServiceTableToolbar";

const mockData = {
  setFilterString: jest.fn(),
  setSortByAttribute: jest.fn(),
  sortByAttribute: "name",
  filterString: "someVal"
};

describe("Service View Toolbar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<GMServiceTableToolbar {...mockData} />);
  });

  test("matches snapshot", () => {
    const tree = renderer
      .create(<GMServiceTableToolbar {...mockData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("calls setFilterString on input change", () => {
    wrapper.find({ type: "search" }).simulate("change");
    expect(wrapper.props().setFilterString).toHaveBeenCalled();
  });

  test("calls setSortByAttribute on react-select onChange event", () => {
    const select = wrapper.find("Select");
    select.props().onChange("some value");
    expect(wrapper.props().setSortByAttribute).toHaveBeenCalledTimes(1);
  });

  test("sets value of input to filterString", () => {
    expect(wrapper.find({ type: "search" }).props().value).toBe("someVal");
  });
});
