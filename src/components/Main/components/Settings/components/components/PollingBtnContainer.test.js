import React from "react";
import { shallow } from "enzyme";
import PollingBtnContainer from "./PollingBtnContainer";

describe("PollingBtnContainer", () => {
  it("matches snapshot", () => {
    const aPollingBtnContainer = shallow(<PollingBtnContainer />);
    expect(aPollingBtnContainer).toMatchSnapshot();
  });
});
