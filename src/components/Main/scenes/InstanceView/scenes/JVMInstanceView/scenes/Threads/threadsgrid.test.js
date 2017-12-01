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
import ThreadsTableToolbar from "./components/ThreadsTableToolbar";
import ThreadsTable from "./components/ThreadsTable";
import ErrorBoundary from "components/ErrorBoundary";
import ThreadsTableLineItem from "./components/ThreadsTable/components/ThreadsTableLineItem";

// import Actions
import "services";

const toolBarProps = {
  threadCounts: { active: 1, all: 6, idle: 2, stopped: 3 },
  threadsFilter: "active"
};

const threadsTableProps = {
  filteredThreadData: [
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
    }
  ]
};
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

describe("ThreadsGrid View", () => {
  beforeEach(() => {
    wrapper = mount(RouterWrap);
  });

  test("matches snapshot", () => {
    const tree = renderer.create(RouterWrap).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders correct components", () => {
    expect(wrapper.find(ThreadsTableToolbar)).toHaveLength(1);
    expect(wrapper.find(ThreadsTable)).toHaveLength(1);
    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
    // nested component
    expect(wrapper.find(ThreadsTableLineItem)).toHaveLength(1);
  });

  // Will be updating tests shortly after new TableToolbar is implemented for threads view
  test("passes the correct props down to ThreadsTableToolbar", () => {
    expect(wrapper.find(ThreadsTableToolbar).props()).toMatchObject(
      toolBarProps
    );
  });

  test("passes the correct props down to ThreadsTable", () => {
    expect(wrapper.find(ThreadsTable).props()).toMatchObject(threadsTableProps);
  });
});
