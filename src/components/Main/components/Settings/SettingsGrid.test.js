import React from "react";
import { Actions } from "jumpstate";
import { configure, shallow, mount, getElement } from "enzyme";
import renderer from "react-test-renderer";
import { MemoryRouter, Route } from "react-router-dom";
import * as state from "json/mockReduxState";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import SettingsGrid from "./index";

//import all necessary Action effect so the Actions object is set within this test harness
import "services/fabricMicroservices/index.js";
import "services/instance/metrics/index.js";

const mockStore = configureStore();

let SettingGridWrap,
  mockState = state.default;

describe("SettingsGrid component", () => {
  beforeEach(function() {
    SettingGridWrap = mount(<SettingsGrid store={mockStore(mockState)} />);
  });

  test("Matches snapshot", () => {
    const SettingGrid = renderer
      .create(<SettingsGrid store={mockStore(mockState)} />)
      .toJSON();
    expect(SettingGrid).toMatchSnapshot();
  });

  test("Has an errorBoundary", () => {
    expect(SettingGridWrap.find("ErrorBoundary").length).toBe(1);
  });

  test("Has 1 Fabric Polling Setting if fabricServer prop is not available and its called Polling", () => {
    mockState.settings.fabricServer = "";
    SettingGridWrap = mount(<SettingsGrid store={mockStore(mockState)} />);
    expect(
      SettingGridWrap.find("PollingSettings")
        .find("h3")
        .text()
    ).toBe("Polling");
  });

  test("Has 2 Fabric Polling Settings if fabricServer prop is available", () => {
    mockState.settings.fabricServer = "http://localhost:1337";
    SettingGridWrap = mount(<SettingsGrid store={mockStore(mockState)} />);
    expect(SettingGridWrap.find("PollingSettings").length).toBe(2);
  });

  test("Has Cache Size readout", () => {
    expect(SettingGridWrap.find("Readout").props().readoutItems[0].title).toBe(
      "Cache Size"
    );
  });

  test("Clear Cache button exists", () => {
    expect(SettingGridWrap.find({ title: "Clear Cache" })).toHaveLength(1);
  });
});
