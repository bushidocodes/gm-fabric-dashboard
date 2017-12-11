import React from "react";
import { shallow } from "enzyme";
import TabIcon from "./TabIcon";

describe("TabIcon", () => {
  it("matches snapshot", () => {
    const aTabIcon = shallow(<TabIcon />);
    expect(aTabIcon).toMatchSnapshot();
  });
});
