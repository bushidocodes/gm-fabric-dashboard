import React from "react";
import { shallow } from "enzyme";
import InspectorItem from "./InspectorItem";

describe("InspectorItem", () => {
  it("matches snapshot", () => {
    const aInspectorItem = shallow(<InspectorItem />);
    expect(aInspectorItem).toMatchSnapshot();
  });
});
