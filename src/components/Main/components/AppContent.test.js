import React from "react";
import { shallow } from "enzyme";
import AppContent from "./AppContent";

describe("AppContent", () => {
  it("matches snapshot", () => {
    const aAppContent = shallow(<AppContent />);
    expect(aAppContent).toMatchSnapshot();
  });
});
