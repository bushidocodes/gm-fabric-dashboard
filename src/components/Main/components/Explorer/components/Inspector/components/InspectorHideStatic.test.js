import React from "react";
import { shallow } from "enzyme";
import InspectorHideStatic from "./InspectorHideStatic";

describe("InspectorHideStatic", () => {
  it("matches snapshot", () => {
    const aInspectorHideStatic = shallow(<InspectorHideStatic />);
    expect(aInspectorHideStatic).toMatchSnapshot();
  });
});
