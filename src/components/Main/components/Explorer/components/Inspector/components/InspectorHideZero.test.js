import React from "react";
import { shallow } from "enzyme";
import InspectorHideZero from "./InspectorHideZero";

describe("InspectorHideZero", () => {
  it("matches snapshot", () => {
    const aInspectorHideZero = shallow(<InspectorHideZero />);
    expect(aInspectorHideZero).toMatchSnapshot();
  });
});
