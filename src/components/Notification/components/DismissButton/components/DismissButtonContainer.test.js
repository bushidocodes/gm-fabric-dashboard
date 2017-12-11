import React from "react";
import { shallow } from "enzyme";
import DismissButtonContainer from "./DismissButtonContainer";

describe("DismissButtonContainer", () => {
  it("matches snapshot", () => {
    const aDismissButtonContainer = shallow(<DismissButtonContainer />);
    expect(aDismissButtonContainer).toMatchSnapshot();
  });
});
