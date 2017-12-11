import React from "react";
import { shallow } from "enzyme";
import TabGroup from "./TabGroup";

describe("TabGroup", () => {
  it("matches snapshot", () => {
    const aTabGroup = shallow(<TabGroup />);
    expect(aTabGroup).toMatchSnapshot();
  });
});
