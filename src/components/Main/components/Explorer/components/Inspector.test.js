import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import Inspector from "./Inspector";

const mockData = [
  "finagle/build/revision",
  "finagle/clientregistry/initialresolution_ms",
  "finagle/clientregistry/size",
  "finagle/future_pool/active_tasks",
  "finagle/future_pool/completed_tasks",
  "finagle/future_pool/pool_size",
  "finagle/timer/deviation_ms.avg",
  "http/closes",
  "http/connection_duration.count",
  "http/connection_received_bytes.count",
  "http/connection_requests.count",
  "http/connection_sent_bytes.count",
  "http/connections",
  "http/connects"
];

const mockProps = {
  data: mockData,
  onClick: jest.fn(),
  onSearch: jest.fn(),
  searchQuery: "",
  selectedMetric: null
};

describe("Inspector", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Inspector {...mockProps} />);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<Inspector {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders data", () => {
    expect(wrapper.find(".inspector-item")).toHaveLength(14);
    wrapper.find(".inspector-item").forEach((item, idx) => {
      expect(item.text()).toBe(mockData[idx]);
    });
  });

  test("does not render a ul when there is no data", () => {
    expect(wrapper.find("ul")).toHaveLength(1);
    wrapper.setProps({ data: [] });
    expect(wrapper.find("ul")).toHaveLength(0);
  });

  test("calls onSearch when user inputs search query", () => {
    wrapper.find(".inspector-search").simulate("change");
    expect(wrapper.props().onSearch).toHaveBeenCalled();
  });

  test("calls onClick when user selects a metric", () => {
    wrapper
      .find(".inspector-item")
      .first()
      .simulate("click");
    expect(wrapper.props().onClick).toHaveBeenCalled();
  });

  test("adds active classname to selected metric", () => {
    expect(wrapper.find(".active")).toHaveLength(0);
    wrapper.setProps({ selectedMetric: "http/closes" });
    expect(wrapper.find(".active")).toHaveLength(1);
    expect(wrapper.find(".active").text()).toBe("http/closes");
  });

  test("filters data by searchQuery", () => {
    wrapper.setProps({ searchQuery: "finagle" });
    expect(wrapper.find(".inspector-item")).toHaveLength(7);
    wrapper.find(".inspector-item").forEach((item, idx) => {
      expect(item.text()).toBe(mockData[idx]);
    });
  });
});
