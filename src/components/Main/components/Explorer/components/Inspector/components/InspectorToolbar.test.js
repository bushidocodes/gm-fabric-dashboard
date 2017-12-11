import React from "react";
import { shallow } from "enzyme";
import InspectorToolbar from "./InspectorToolbar";

describe("InspectorToolbar", () => {
  it("matches snapshot", () => {
    const aInspectorToolbar = shallow(<InspectorToolbar />);
    expect(aInspectorToolbar).toMatchSnapshot();
  });
});
