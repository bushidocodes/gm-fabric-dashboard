import React from "react";
import { shallow } from "enzyme";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
  it("matches snapshot", () => {
    const aToolbar = shallow(<Toolbar />);
    expect(aToolbar).toMatchSnapshot();
  });
});
