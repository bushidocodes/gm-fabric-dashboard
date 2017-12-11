import React from "react";
import { shallow } from "enzyme";
import TabKey from "./TabKey";

describe("TabKey", () => {
  it("matches snapshot", () => {
    const aTabKey = shallow(<TabKey />);
    expect(aTabKey).toMatchSnapshot();
  });
});
