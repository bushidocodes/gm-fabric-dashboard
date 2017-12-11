import React from "react";
import { shallow } from "enzyme";
import MetricsList from "./MetricsList";

describe("MetricsList", () => {
  it("matches snapshot", () => {
    const aMetricsList = shallow(<MetricsList />);
    expect(aMetricsList).toMatchSnapshot();
  });
});
