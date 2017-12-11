import React from "react";
import { shallow } from "enzyme";
import ToolbarRight from "./ToolbarRight";

describe("ToolbarRight", () => {
  it("matches snapshot", () => {
    const aToolbarRight = shallow(<ToolbarRight />);
    expect(aToolbarRight).toMatchSnapshot();
  });
});
