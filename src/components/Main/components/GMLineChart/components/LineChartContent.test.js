import React from "react";
import { shallow } from "enzyme";
import LineChartContent from "./LineChartContent";

describe("LineChartContent", () => {
  it("matches snapshot", () => {
    const aLineChartContent = shallow(<LineChartContent />);
    expect(aLineChartContent).toMatchSnapshot();
  });
});
