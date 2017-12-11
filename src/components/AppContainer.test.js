import React from "react";
import { shallow } from "enzyme";
import AppContainer from "./AppContainer";

describe("AppContainer", () => {
  it("matches snapshot", () => {
    const aAppContainer = shallow(<AppContainer />);
    expect(aAppContainer).toMatchSnapshot();
  });
});
