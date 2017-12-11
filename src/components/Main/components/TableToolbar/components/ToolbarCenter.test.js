import React from "react";
import { shallow } from "enzyme";
import ToolbarCenter from "./ToolbarCenter";

describe("ToolbarCenter", () => {
  it("matches snapshot", () => {
    const aToolbarCenter = shallow(<ToolbarCenter />);
    expect(aToolbarCenter).toMatchSnapshot();
  });
});
