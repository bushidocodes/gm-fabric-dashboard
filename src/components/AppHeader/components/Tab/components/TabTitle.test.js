import React from "react";
import { shallow } from "enzyme";
import TabTitle from "./TabTitle";

describe("TabTitle", () => {
  it("matches snapshot", () => {
    const aTabTitle = shallow(<TabTitle />);
    expect(aTabTitle).toMatchSnapshot();
  });
});
