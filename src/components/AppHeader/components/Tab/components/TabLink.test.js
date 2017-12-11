import React from "react";
import { shallow } from "enzyme";
import TabLink from "./TabLink";

describe("TabLink", () => {
  it("matches snapshot", () => {
    const aTabLink = shallow(<TabLink to="/" />);
    expect(aTabLink).toMatchSnapshot();
  });
});
