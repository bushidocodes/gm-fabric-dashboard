import React from "react";
import { shallow } from "enzyme";
import TabVal from "./TabVal";

describe("TabVal", () => {
  it("matches snapshot", () => {
    const aTabVal = shallow(<TabVal />);
    expect(aTabVal).toMatchSnapshot();
  });
});
