import React from "react";
import { shallow } from "enzyme";
import TableColHeader from "./TableColHeader";

describe("TableColHeader", () => {
  it("matches snapshot", () => {
    const aTableColHeader = shallow(<TableColHeader />);
    expect(aTableColHeader).toMatchSnapshot();
  });
});
