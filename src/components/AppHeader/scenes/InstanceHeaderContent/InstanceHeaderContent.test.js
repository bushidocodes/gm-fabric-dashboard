import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import PropTypes from "prop-types";
import configureMockStore from "redux-mock-store";

import state from "json/mockReduxState";
import { generateHeaderTabs } from "utils/selectors";
import InstanceHeaderContent from "./index";

const store = configureMockStore()(state);

// Wrap in Memory Router to mock route props (history, match, location)
const RouterWrap = (
  <MemoryRouter>
    <Route render={props => <InstanceHeaderContent {...props} />} />
  </MemoryRouter>
);

describe("InstanceHeaderContent", () => {
  let wrapper;

  beforeEach(() => {
    // mount with context and childContextTypes, which prevents our test from
    // choking on a connect()'ed child component that requires context
    wrapper = mount(RouterWrap, {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
  });

  test("returns DefaultHeaderContent when runtime prop is undefined", () => {
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(1);
    expect(wrapper.find("JVMHeaderContent")).toHaveLength(0);
    expect(wrapper.find("GoHeaderContent")).toHaveLength(0);
  });

  test("returns JVMHeaderContent when runtime prop is JVM", () => {
    // modify state
    let modState = Object.assign({}, state, {
      settings: {
        runtime: "JVM"
      }
    });
    // remount with modified store state
    wrapper = mount(RouterWrap, {
      context: { store: configureMockStore()(modState) },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
    expect(wrapper.find("JVMHeaderContent")).toHaveLength(1);
    expect(wrapper.find("GoHeaderContent")).toHaveLength(0);
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(0);
  });

  test("returns GoHeaderContent when runtime prop is JVM", () => {
    // modify state
    let modState = Object.assign({}, state, {
      settings: {
        runtime: "GO"
      }
    });
    // remount with modified store state
    wrapper = mount(RouterWrap, {
      context: { store: configureMockStore()(modState) },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
    expect(wrapper.find("GoHeaderContent")).toHaveLength(1);
    expect(wrapper.find("JVMHeaderContent")).toHaveLength(0);
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(0);
  });

  test("passes correct props to children", () => {
    expect(wrapper.find("DefaultHeaderContent").props()).toMatchObject({
      basePath: "",
      metrics: state.instance.metrics,
      headerTabs: generateHeaderTabs(state)
    });
  });
});
