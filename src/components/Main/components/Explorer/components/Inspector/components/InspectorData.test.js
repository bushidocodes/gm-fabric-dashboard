import React from "react";
import { shallow } from "enzyme";
import InspectorData from "./InspectorData";

describe("InspectorData", () => {
  it("matches snapshot", () => {
    const aInspectorData = shallow(<InspectorData />);
    expect(aInspectorData).toMatchSnapshot();
  });
});
