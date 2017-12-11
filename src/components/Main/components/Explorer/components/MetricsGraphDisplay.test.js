import React from "react";
import { shallow } from "enzyme";
import MetricsGraphDisplay from "./MetricsGraphDisplay";

describe("MetricsGraphDisplay", () => {
  it("matches snapshot", () => {
    const aMetricsGraphDisplay = shallow(<MetricsGraphDisplay />);
    expect(aMetricsGraphDisplay).toMatchSnapshot();
  });
});
