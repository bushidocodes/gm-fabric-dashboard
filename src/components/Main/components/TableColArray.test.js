import React from "react";
import { shallow } from "enzyme";
import TableColArray from "./TableColArray";

describe("TableColArray", () => {
  it("matches snapshot", () => {
    const aTableColArray = shallow(<TableColArray />);
    expect(aTableColArray).toMatchSnapshot();
  });
});
