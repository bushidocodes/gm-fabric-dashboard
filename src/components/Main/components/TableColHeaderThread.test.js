import React from "react";
import { shallow } from "enzyme";
import TableColHeaderThread from "./TableColHeaderThread";

describe("TableColHeaderThread", () => {
  it("matches snapshot", () => {
    const aTableColHeaderThread = shallow(<TableColHeaderThread />);
    expect(aTableColHeaderThread).toMatchSnapshot();
  });
});
