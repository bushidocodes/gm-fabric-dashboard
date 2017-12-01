import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";

// Utilities
import mockState from "json/mockReduxState";

// Components
import ThreadsGrid from "./index";
import ThreadsSection from "./components/ThreadsSection";
import ErrorBoundary from "components/ErrorBoundary";
import ThreadsTableLineItem from "./components/ThreadsSection/components/ThreadsTable/components/ThreadsTableLineItem";

// import Actions
import "services";

// Create a mock store and initialize with mock data
const store = configureStore()(mockState);

// Wrap ThreadsGrid in Memory Router
const RouterWrap = (
  <Provider store={store}>
    <MemoryRouter>
      <Route render={props => <ThreadsGrid {...props} />} />
    </MemoryRouter>
  </Provider>
);

let wrapper;

const expectedProps = {
  threadsTable: [
    {
      daemon: true,
      id: "1",
      name: "Test Waiting",
      priority: 10,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.Object.wait(Object.java:502)",
        "java.lang.ref.Reference.tryHandlePending(Reference.java:191)",
        "java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)"
      ],
      state: "WAITING"
    },
    {
      daemon: true,
      id: "2",
      name: "Test Runnable",
      priority: 8,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)",
        "java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)"
      ],
      state: "RUNNABLE"
    },
    {
      daemon: true,
      id: "3",
      name: "Test Timed Waiting",
      priority: 8,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)",
        "java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)"
      ],
      state: "TIMED_WAITING"
    },
    {
      daemon: true,
      id: "4",
      name: "Test Terminated",
      priority: 8,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)",
        "java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)"
      ],
      state: "TERMINATED"
    },
    {
      daemon: true,
      id: "5",
      name: "Test Blocked",
      priority: 8,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)",
        "java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)"
      ],
      state: "BLOCKED"
    },
    {
      daemon: true,
      id: "6",
      name: "Test New",
      priority: 8,
      stack: [
        "java.lang.Object.wait(Native Method)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)",
        "java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)",
        "java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)"
      ],
      state: "NEW"
    }
  ]
};

describe("ThreadsGrid View", () => {
  beforeEach(() => {
    wrapper = mount(RouterWrap);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(RouterWrap).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correct components", () => {
    expect(wrapper.find(ThreadsSection)).toHaveLength(1);
    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
    // nested component
    expect(wrapper.find(ThreadsTableLineItem)).toHaveLength(1);
  });

  test("passes the correct props down to ThreadsSection", () => {
    expect(wrapper.find(ThreadsSection).props()).toMatchObject(expectedProps);
  });
});
