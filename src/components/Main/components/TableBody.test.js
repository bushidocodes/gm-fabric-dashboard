import React from "react";
import { shallow } from "enzyme";
import TableBody from "./TableBody";

describe("TableBody", () => {
  it("matches snapshot", () => {
    const aTableBody = shallow(<TableBody />);
    expect(aTableBody).toMatchSnapshot();
  });
});
