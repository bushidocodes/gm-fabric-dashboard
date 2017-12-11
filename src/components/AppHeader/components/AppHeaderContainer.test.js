import React from "react";
import { shallow } from "enzyme";
import AppHeaderContainer from "./AppHeaderContainer";

describe("AppHeaderContainer", () => {
  it("matches snapshot", () => {
    const aAppHeaderContainer = shallow(<AppHeaderContainer />);
    expect(aAppHeaderContainer).toMatchSnapshot();
  });
});
