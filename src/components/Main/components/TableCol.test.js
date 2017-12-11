import React from "react";
import { shallow } from "enzyme";
import TableCol from "./TableCol";

describe("TableCol", () => {
  it("matches snapshot", () => {
    const aTableCol = shallow(<TableCol />);
    expect(aTableCol).toMatchSnapshot();
  });
});
