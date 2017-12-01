import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import mockState from "json/mockReduxState";
import ThreadsTable from "./index";

let ThreadsTableWrap;
const mockStore = configureStore()(mockState);

describe("ThreadsTable component", () => {
  beforeEach(() => {
    ThreadsTableWrap = mount(<ThreadsTable store={mockStore} />);
  });

  test("Matched the snapshot", () => {
    expect(ThreadsTableWrap).toMatchSnapshot();
  });
});
