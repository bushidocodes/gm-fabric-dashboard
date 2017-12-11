import React from "react";
import { shallow } from "enzyme";
import LineChartTitle from "./LineChartTitle";

describe("LineChartTitle", () => {
  it("matches snapshot", () => {
    const aLineChartTitle = shallow(<LineChartTitle />);
    expect(aLineChartTitle).toMatchSnapshot();
  });
});
