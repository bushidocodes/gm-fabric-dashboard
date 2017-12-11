import React from "react";
import { shallow } from "enzyme";
import LineChartDetails from "./LineChartDetails";

describe("LineChartDetails", () => {
  it("matches snapshot", () => {
    const aLineChartDetails = shallow(<LineChartDetails />);
    expect(aLineChartDetails).toMatchSnapshot();
  });
});
