import React from "react";
import { shallow } from "enzyme";
import TableDisplay from "./TableDisplay";

describe("TableDisplay", () => {
  it("matches snapshot", () => {
    const aTableDisplay = shallow(<TableDisplay />);
    expect(aTableDisplay).toMatchSnapshot();
  });
});
