import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import configureMockStore from "redux-mock-store";

import state from "json/mockReduxState";
import { generateHeaderTabs } from "utils/selectors";
import InstanceHeaderContent from "./index";

const store = configureMockStore()(state);

// Wrap in Memory Router to mock route props (history, match, location)
const ConnectedInstanceHeaderContent = (
  <Provider store={store}>
    <InstanceHeaderContent />
  </Provider>
);

describe("InstanceHeaderContent", () => {
  let wrapper;

  beforeEach(() => {
    // mount with context and childContextTypes, which prevents our test from
    // choking on a connect()'ed child component that requires context
    wrapper = shallow(ConnectedInstanceHeaderContent, {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
  });

  test("returns JVMHeaderContent when runtime prop is JVM", () => {
    // modify state
    let modState = Object.assign({}, state, {
      fabric: {
        ...state.fabric,
        selectedServiceSlug: "jvm-exemplar-v1-0"
      }
    });
    // remount with modified store state
    wrapper = shallow(ConnectedInstanceHeaderContent, {
      context: { store: configureMockStore()(modState) },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
    expect(
      wrapper
        .dive()
        .dive()
        .find("JVMHeaderContent")
    ).toHaveLength(1);
    expect(wrapper.find("GoHeaderContent")).toHaveLength(0);
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(0);
  });

  test("returns GoHeaderContent when runtime prop is GO", () => {
    // modify state
    let modState = Object.assign({}, state, {
      fabric: {
        ...state.fabric,
        selectedServiceSlug: "go-exemplar-v1-0"
      }
    });
    // remount with modified store state
    wrapper = shallow(ConnectedInstanceHeaderContent, {
      context: { store: configureMockStore()(modState) },
      childContextTypes: { store: PropTypes.object.isRequired }
    })
      .dive()
      .dive();
    expect(wrapper.find("GoHeaderContent")).toHaveLength(1);
    expect(wrapper.find("JVMHeaderContent")).toHaveLength(0);
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(0);
  });

  xtest("passes correct props to children", () => {
    // modify state
    let modState = Object.assign({}, state, {
      fabric: {
        ...state.fabric,
        selectedServiceSlug: "go-exemplar-v1-0"
      }
    });
    wrapper = shallow(ConnectedInstanceHeaderContent, {
      context: { store: configureMockStore()(modState) },
      childContextTypes: { store: PropTypes.object.isRequired }
    })
      .dive()
      .dive();
    expect(wrapper.find("GoHeaderContent").props()).toMatchObject({
      basePath: "/go-exemplar-v1-0/2smao7xwboy0000000000",
      metrics: state.instance.metrics,
      headerTabs: generateHeaderTabs(state)
    });
  });
});
