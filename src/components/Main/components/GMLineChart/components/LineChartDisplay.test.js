import React from "react";
import { shallow } from "enzyme";
import LineChartDisplay from "./LineChartDisplay";

describe("LineChartDisplay", () => {
  it("matches snapshot", () => {
    const aLineChartDisplay = shallow(<LineChartDisplay />);
    expect(aLineChartDisplay).toMatchSnapshot();
  });
});
