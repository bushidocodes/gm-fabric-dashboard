import React from "react";
import { shallow } from "enzyme";
import TableRow from "./TableRow";

describe("TableRow", () => {
  it("matches snapshot", () => {
    const aTableRow = shallow(<TableRow />);
    expect(aTableRow).toMatchSnapshot();
  });
});
