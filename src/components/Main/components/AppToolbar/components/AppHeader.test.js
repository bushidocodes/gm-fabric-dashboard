import React from "react";
import { shallow } from "enzyme";
import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("matches snapshot", () => {
    const aAppHeader = shallow(<AppHeader />);
    expect(aAppHeader).toMatchSnapshot();
  });
});
