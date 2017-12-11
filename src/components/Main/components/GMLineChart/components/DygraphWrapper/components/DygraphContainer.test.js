import React from "react";
import { shallow } from "enzyme";
import DygraphContainer from "./DygraphContainer";

describe("DygraphContainer", () => {
  it("matches snapshot", () => {
    const aDygraphContainer = shallow(<DygraphContainer />);
    expect(aDygraphContainer).toMatchSnapshot();
  });
});
