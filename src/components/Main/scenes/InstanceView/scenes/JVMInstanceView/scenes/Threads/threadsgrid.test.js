import React from "react";
import { Actions } from "jumpstate";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { CreateJumpstateMiddleware } from "jumpstate";

// Utilities
import mockState from "json/mockReduxState";

// Components
import ThreadsGrid from "./index";

// Mock the jumpstate effect used in ThreadsGrid
Actions.fetchAndStoreInstanceThreads = jest.fn();

// Create a mock store and initialize with mock data
const store = configureMockStore([CreateJumpstateMiddleware()])(mockState);

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

// Wrap ThreadsGrid in Memory Router
const RouterWrap = <ThreadsGrid store={store} />;

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
    expect(wrapper.find("TableToolbar")).toHaveLength(1);
    expect(wrapper.find("ThreadsTable")).toHaveLength(1);
    expect(wrapper.find("ErrorBoundary")).toHaveLength(1);
  });

  test("passes the correct props down to TableToolbar", () => {
    expect(wrapper.find("TableToolbar").props()).toMatchObject({
      groupByProps: {
        groupByAttribute: "none",
        groupByOptions: [
          { label: "State", value: "state" },
          { label: "None", value: "none" }
        ]
      },
      searchInputProps: {
        filterString: "",
        searchPlaceholder: "Search Threads"
      },
      sortByProps: {
        sortByAttribute: "id",
        sortByOptions: [
          { label: "State", value: "state" },
          { label: "Name", value: "name" },
          { label: "ID", value: "id" }
        ]
      }
    });
  });

  test("passes the correct props down to ThreadsTable", () => {
    expect(wrapper.find("ThreadsTable").props()).toMatchObject(
      threadsTableProps
    );
  });
});
