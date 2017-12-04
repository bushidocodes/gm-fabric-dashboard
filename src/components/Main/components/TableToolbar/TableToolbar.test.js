import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import TableToolbar from "./index.js";

const sortByOptions = [
  {
    value: "Name",
    label: "Name"
  },
  {
    value: "Status",
    label: "Status"
  }
];

const groupByOptions = [
  {
    value: "Owner",
    label: "Owner"
  },
  {
    value: "Status",
    label: "Status"
  }
];

const mockFabricViewProps = {
  displayTypeProps: {
    displayType: "Card",
    setDisplayType: jest.fn()
  },
  searchInputProps: {
    filterString: "",
    setFilterString: jest.fn(),
    searchPlaceholder: "Search Services"
  },
  groupByProps: {
    groupByOptions,
    groupByAttribute: "Status",
    setGroupByAttribute: jest.fn()
  },
  sortByProps: {
    sortByOptions,
    sortByAttribute: "Name",
    setSortByAttribute: jest.fn()
  }
};

describe("Table Toolbar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TableToolbar {...mockFabricViewProps} />);
  });

  test("matches snapshot", () => {
    const tree = renderer
      .create(<TableToolbar {...mockFabricViewProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders search box", () => {
    expect(wrapper.find({ type: "search" })).toHaveLength(1);
  });

  test("calls setFilterString when search input field changes", () => {
    wrapper.find({ type: "search" }).simulate("change");
    expect(wrapper.props().searchInputProps.setFilterString).toHaveBeenCalled();
  });

  test("does not render search box if searchInputProps is not provided", () => {
    wrapper.setProps({
      searchInputProps: null
    });
    expect(wrapper.find({ type: "search" })).toHaveLength(0);
  });

  test("renders display type buttons", () => {
    // Find buttons with title attributes "Card" and "List"
    expect(wrapper.find("button").find({ title: "Card" })).toHaveLength(1);
    expect(wrapper.find("button").find({ title: "List" })).toHaveLength(1);
  });

  test("calls setDisplayType when a display type button is clicked", () => {
    // Simulate a button click and check if setDisplayType was called
    wrapper
      .find("button")
      .find({ title: "Card" })
      .simulate("click");
    expect(wrapper.props().displayTypeProps.setDisplayType).toHaveBeenCalled();
  });

  test("does not render display type buttons if displayTypeProps is not provided", () => {
    wrapper.setProps({
      displayTypeProps: null
    });
    // Find buttons with title attributes "Card" and "List"
    expect(wrapper.find("button").find({ title: "Card" })).toHaveLength(0);
    expect(wrapper.find("button").find({ title: "List" })).toHaveLength(0);
  });

  test("adds an active class to button that matches displayType", () => {
    let cardButton = wrapper.find("button").find({ title: "Card" });
    let listButton = wrapper.find("button").find({ title: "List" });
    expect(cardButton.hasClass("active")).toBe(true);
    expect(listButton.hasClass("active")).toBe(false);
    wrapper.setProps({
      displayTypeProps: { displayType: "List", setDisplayType: jest.fn() }
    });
    listButton = wrapper.find("button").find({ title: "List" });
    cardButton = wrapper.find("button").find({ title: "Card" });
    expect(listButton.hasClass("active")).toBe(true);
    expect(cardButton.hasClass("active")).toBe(false);
  });

  // TODO: Figure out how to simulate a change event with react-select so we can test onChange handlers

  test("renders a group by dropdown with a value equal to groupByAttribute", () => {
    const dropdown = wrapper
      .find("Select")
      .find("input")
      .find({ name: "form-field-group-by" });
    expect(dropdown).toHaveLength(1);
    expect(dropdown.props().value).toBe("Status");
  });

  test("does not render a group by dropdown if groupByProps is not provided", () => {
    wrapper.setProps({
      groupByProps: null
    });
    const dropdown = wrapper
      .find("Select")
      .find("input")
      .find({ name: "form-field-group-by" });
    expect(dropdown).toHaveLength(0);
  });

  test("renders a sort by dropdown", () => {
    const dropdown = wrapper
      .find("Select")
      .find("input")
      .find({ name: "form-field-sort-by" });
    expect(dropdown).toHaveLength(1);
    expect(dropdown.props().value).toBe("Name");
  });

  test("does not render a group by dropdown if sortByProps is not provided", () => {
    wrapper.setProps({
      sortByProps: null
    });
    const dropdown = wrapper
      .find("Select")
      .find("input")
      .find({ name: "form-field-sort-by" });
    expect(dropdown).toHaveLength(0);
  });

  test("optional children props render additional nodes into their corresponding columns", () => {
    wrapper.setProps({
      toolbarLeftChildren: <h1>Left Child</h1>,
      toolbarCenterChildren: <h1>Center Child</h1>,
      toolbarRightChildren: <h1>Right Child</h1>
    });
    const headers = wrapper.find("h1");
    expect(headers).toHaveLength(3);
    expect(headers.at(0).text()).toBe("Left Child");
    expect(headers.at(1).text()).toBe("Center Child");
    expect(headers.at(2).text()).toBe("Right Child");
  });
});
