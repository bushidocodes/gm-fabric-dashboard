import React from "react";
import { shallow } from "enzyme";
import DataSparkline from "./DataSparkline";

describe("DataSparkline", () => {
  it("matches snapshot", () => {
    const aDataSparkline = shallow(<DataSparkline />);
    expect(aDataSparkline).toMatchSnapshot();
  });
});
