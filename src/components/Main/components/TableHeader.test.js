import React from "react";
import { shallow } from "enzyme";
import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  it("matches snapshot", () => {
    const aTableHeader = shallow(<TableHeader />);
    expect(aTableHeader).toMatchSnapshot();
  });
});
