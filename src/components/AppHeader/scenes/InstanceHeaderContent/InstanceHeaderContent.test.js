import React from "react";

import configureMockStore from "redux-mock-store";

import state from "json/mockReduxState";
import { generateHeaderTabs } from "utils/selectors";
import { shallowWithIntl } from "utils/i18nTesting";
import InstanceHeaderContent from "./index";

const store = configureMockStore()(state);

// Wrap in Memory Router to mock route props (history, match, location)
const ConnectedInstanceHeaderContent = <InstanceHeaderContent store={store} />;

xdescribe("InstanceHeaderContent", () => {
  let wrapper;

  beforeEach(() => {
    // mount with context and childContextTypes, which prevents our test from
    // choking on a connect()'ed child component that requires context
    wrapper = shallowWithIntl(ConnectedInstanceHeaderContent);
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
    wrapper = shallowWithIntl(
      <InstanceHeaderContent store={configureMockStore()(modState)} />
    )
      .dive()
      .dive();

    expect(wrapper.find("JVMHeaderContent")).toHaveLength(1);
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
    wrapper = shallowWithIntl(
      <InstanceHeaderContent store={configureMockStore()(modState)} />
    )
      .dive()
      .dive();
    expect(wrapper.find("GoHeaderContent")).toHaveLength(1);
    expect(wrapper.find("JVMHeaderContent")).toHaveLength(0);
    expect(wrapper.find("DefaultHeaderContent")).toHaveLength(0);
  });

  test("passes correct props to children", () => {
    // modify state
    let modState = Object.assign({}, state, {
      fabric: {
        ...state.fabric,
        selectedServiceSlug: "go-exemplar-v1-0"
      }
    });
    wrapper = shallowWithIntl(
      <InstanceHeaderContent store={configureMockStore()(modState)} />
    )
      .dive()
      .dive();

    expect(wrapper.find("GoHeaderContent").props()).toMatchObject({
      basePath: "/go-exemplar-v1-0/2smao7xwboy0000000000",
      metrics: state.instance.metrics,
      headerTabs: generateHeaderTabs(state)
    });
  });
});
