import React from "react";
import { shallow } from "enzyme";
import LineChartEmpty from "./LineChartEmpty";

describe("LineChartEmpty", () => {
  it("matches snapshot", () => {
    const aLineChartEmpty = shallow(<LineChartEmpty />);
    expect(aLineChartEmpty).toMatchSnapshot();
  });
});
