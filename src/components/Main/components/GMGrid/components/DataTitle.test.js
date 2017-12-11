import React from "react";
import { shallow } from "enzyme";
import DataTitle from "./DataTitle";

describe("DataTitle", () => {
  it("matches snapshot", () => {
    const aDataTitle = shallow(<DataTitle />);
    expect(aDataTitle).toMatchSnapshot();
  });
});
