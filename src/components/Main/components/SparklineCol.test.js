import React from "react";
import { shallow } from "enzyme";
import SparklineCol from "./SparklineCol";

describe("SparklineCol", () => {
  it("matches snapshot", () => {
    const aSparklineCol = shallow(<SparklineCol />);
    expect(aSparklineCol).toMatchSnapshot();
  });
});
