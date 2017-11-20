import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import PollingSettings from "./PollingSettings";

let wrapper;
const mockChangePollingInterval = jest.fn();
const mockStartPolling = jest.fn();
const mockStopPolling = jest.fn();
mockStartPolling.mockReturnValue("Start Polling Function");
mockStopPolling.mockReturnValue("Stop Polling Function");

let mockProps = {
  changePollingInterval: mockChangePollingInterval,
  interval: 5000,
  isPolling: true,
  startPolling: mockStartPolling,
  stopPolling: mockStopPolling,
  title: "Instance Polling",
  glyph: "Poll"
};

describe("PollingSettings component", () => {
  beforeEach(function() {
    mockStartPolling.mockClear();
    mockStopPolling.mockClear();
    wrapper = mount(<PollingSettings {...mockProps} />);
  });

  test("Matches the snapshot", () => {
    const PollingSettingsComponent = renderer
      .create(<PollingSettings {...mockProps} />)
      .toJSON();
    expect(PollingSettingsComponent).toMatchSnapshot();
  });

  test("Resume / Pause button component is rendered", () => {
    expect(wrapper.find("button").length).toBe(1);
  });

  test("If isPolling prop is set to 'true', button displays 'Pause Updates'", () => {
    wrapper.setProps({ isPolling: true });
    expect(wrapper.find("button").props().title).toBe("Pause Updates");
  });

  test("If isPolling prop is set to 'true', and button is clicked, the function that is called is Stop Polling", () => {
    wrapper.setProps({ isPolling: true });
    wrapper.find("button").simulate("click", { preventDefault() {} });
    expect(mockStopPolling).toBeCalled();
  });

  test("If isPolling prop is set to 'false', the PollingSettings Button displays 'Resume Updates'", () => {
    wrapper.setProps({ isPolling: false });
    expect(wrapper.find("button").props().title).toBe("Resume Updates");
  });

  test("If isPolling prop is set to 'false', and button is clicked, the function that is called is Start Polling", () => {
    wrapper.setProps({ isPolling: false });
    wrapper.find("button").simulate("click", { preventDefault() {} });
    expect(mockStartPolling).toBeCalled();
  });

  test("Glyph is rendered as part of the resume/ pause button", () => {
    expect(
      wrapper
        .find("button")
        .find("g")
        .at(1)
        .hasClass("glyph")
    ).toBe(true);
  });

  test("LayoutSection component is rendered by making sure header tag contains 'Instance Polling' text", () => {
    expect(wrapper.find("LayoutSection")).toHaveLength(1);
  });

  test("InputRange component is getting rendered", () => {
    expect(wrapper.find(".input-range").length).toBe(1);
  });

  test("InputRange value depends on the initial state of the Polling Settings component", () => {
    mockProps.interval = 99000;
    const wrapper = mount(<PollingSettings {...mockProps} />);
    expect(wrapper.find("InputRange").props().value).toBe(99);
  });
});
