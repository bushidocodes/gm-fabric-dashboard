import React from "react";
import { shallow } from "enzyme";
import VizFill from "./VizFill";

describe("VizFill", () => {
  it("matches snapshot", () => {
    const aVizFill = shallow(<VizFill />);
    expect(aVizFill).toMatchSnapshot();
  });
});
