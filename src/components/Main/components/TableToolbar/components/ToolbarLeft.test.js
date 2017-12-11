import React from "react";
import { shallow } from "enzyme";
import ToolbarLeft from "./ToolbarLeft";

describe("ToolbarLeft", () => {
  it("matches snapshot", () => {
    const aToolbarLeft = shallow(<ToolbarLeft />);
    expect(aToolbarLeft).toMatchSnapshot();
  });
});
