import React from "react";
import { shallow } from "enzyme";
import InspectorWrap from "./InspectorWrap";

describe("InspectorWrap", () => {
  it("matches snapshot", () => {
    const aInspectorWrap = shallow(<InspectorWrap />);
    expect(aInspectorWrap).toMatchSnapshot();
  });
});
