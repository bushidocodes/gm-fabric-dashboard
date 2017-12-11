import React from "react";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";

import TableLineItem from "./TableLineItem";
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

const TableLineItemWithProps = (
  <TableLineItem
    errorPercent={"10.000"}
    errorsCount={32}
    item={"CatalogStream"}
    latency50={445}
    latency99={35}
    relativeReqPercent={20}
    requests={14333}
    requestsPerSecond_dygraph={[0, 1, 5, 30, 56]}
    requestsPerSecond_sparkline={[0, 25, 430, 1256]}
  />
);

describe("<TableLineItem/>", () => {
  beforeEach(() => {
    wrapper = mount(TableLineItemWithProps);
  });

  test("renders styled-components", () => {
    expect(wrapper.find(TableRow).length).toBe(1);
    expect(wrapper.find(TableColVizBar).length).toBe(1);
    expect(wrapper.find(SparklineCol).length).toBe(1);
    expect(wrapper.find(TableCol).length).toBe(3);
    expect(wrapper.find(TableDrawerCollapse).length).toBe(1);
  });

  // use 'shallow' instead of mount for instance tests
  test("should toggle row's open/closed state when row is clicked", () => {
    wrapper = shallow(TableLineItemWithProps);

    const row = wrapper.find(TableRow);
    row.simulate("click", mockedEvent);
    expect(wrapper.state().isOpen).toEqual(true);

    row.simulate("click", mockedEvent);
    expect(wrapper.state().isOpen).toEqual(false);
  });

  test("should toggle drawer's open/closed state when row is clicked", () => {
    wrapper = shallow(TableLineItemWithProps);

    const row = wrapper.find(TableRow);
    row.simulate("click", mockedEvent);
    const drawer = wrapper.find(TableDrawerCollapse);

    expect(wrapper.state().isOpen).toEqual(true);
    expect(drawer.props().isOpened).toBe(true);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(TableLineItemWithProps).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
