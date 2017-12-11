import React from "react";
import { shallow } from "enzyme";
import TableColThread from "./TableColThread";

describe("TableColThread", () => {
  it("matches snapshot", () => {
    const aTableColThread = shallow(<TableColThread />);
    expect(aTableColThread).toMatchSnapshot();
  });
});
