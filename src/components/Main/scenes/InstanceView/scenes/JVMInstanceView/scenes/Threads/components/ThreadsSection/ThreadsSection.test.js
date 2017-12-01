import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import mockState from "json/mockReduxState";
import ThreadsSection from "./ThreadsSection";
import ThreadsTable from "./components/ThreadsTable";
import ThreadsTableToolbar from "./components/ThreadsTableToolbar";

// import Actions
import "services";

let ThreadsSectionWrap;
const mockStore = configureStore()(mockState);
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

describe("JVM > ThreadsSection component", () => {
  beforeEach(() => {
    ThreadsSectionWrap = mount(<ThreadsSection store={mockStore} />);
  });

  test("Matched the snapshot", () => {
    expect(ThreadsSectionWrap).toMatchSnapshot();
  });

  test("renders correct components", () => {
    expect(ThreadsSectionWrap.find(ThreadsTableToolbar)).toHaveLength(1);
    expect(ThreadsSectionWrap.find(ThreadsTable)).toHaveLength(1);
  });

  test("passes the correct props down to ThreadsTableToolbar and ThreadsTable", () => {
    expect(ThreadsSectionWrap.find(ThreadsTableToolbar).props()).toMatchObject(
      toolBarProps
    );
    expect(ThreadsSectionWrap.find(ThreadsTable).props()).toMatchObject(
      threadsTableProps
    );
  });
});
