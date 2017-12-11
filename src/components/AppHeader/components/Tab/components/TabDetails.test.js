import React from "react";
import { shallow } from "enzyme";
import TabDetails from "./TabDetails";

describe("TabDetails", () => {
  it("matches snapshot", () => {
    const aTabDetails = shallow(<TabDetails />);
    expect(aTabDetails).toMatchSnapshot();
  });
});
