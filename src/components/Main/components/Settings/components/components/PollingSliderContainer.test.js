import React from "react";
import { shallow } from "enzyme";
import PollingSliderContainer from "./PollingSliderContainer";

describe("PollingSliderContainer", () => {
  it("matches snapshot", () => {
    const aPollingSliderContainer = shallow(<PollingSliderContainer />);
    expect(aPollingSliderContainer).toMatchSnapshot();
  });
});
