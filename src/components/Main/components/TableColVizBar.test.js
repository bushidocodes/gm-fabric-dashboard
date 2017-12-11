import React from "react";
import { shallow } from "enzyme";
import TableColVizBar from "./TableColVizBar";

describe("TableColVizBar", () => {
  it("matches snapshot", () => {
    const aTableColVizBar = shallow(<TableColVizBar />);
    expect(aTableColVizBar).toMatchSnapshot();
  });
});
