import React from "react";
import { shallow } from "enzyme";
import VizBar from "./VizBar";

describe("VizBar", () => {
  it("matches snapshot", () => {
    const aVizBar = shallow(<VizBar />);
    expect(aVizBar).toMatchSnapshot();
  });
});
