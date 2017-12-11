import React from "react";
import { shallow } from "enzyme";
import TabGraph from "./TabGraph";

describe("TabGraph", () => {
  it("matches snapshot", () => {
    const aTabGraph = shallow(<TabGraph />);
    expect(aTabGraph).toMatchSnapshot();
  });
});
