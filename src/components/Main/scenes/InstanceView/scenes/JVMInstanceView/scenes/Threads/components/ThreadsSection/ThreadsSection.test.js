import React from "react";
import { shallow } from "enzyme";
import mockState from "json/mockReduxState";
import configureStore from "redux-mock-store";

import ThreadsSection from "./ThreadsSection";
const mockStore = configureStore()(mockState);

let ThreadsSectionWrap;

describe("JVM > ThreadsSection component", () => {
  beforeEach(() => {
    ThreadsSectionWrap = shallow(<ThreadsSection store={mockStore} />);
  });

  test("Matched the snapshot", () => {
    expect(ThreadsSectionWrap).toMatchSnapshot();
  });
});
