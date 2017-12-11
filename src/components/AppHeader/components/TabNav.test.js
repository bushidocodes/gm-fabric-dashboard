import React from "react";
import { shallow } from "enzyme";
import TabNav from "./TabNav";

describe("TabNav", () => {
  it("matches snapshot", () => {
    const aTabNav = shallow(<TabNav />);
    expect(aTabNav).toMatchSnapshot();
  });
});
