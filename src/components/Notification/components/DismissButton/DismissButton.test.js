import React from "react";
import { shallow } from "enzyme";
import DismissButton from "./DismissButton";

describe("DismissButton", () => {
  it("matches snapshot", () => {
    const aDismissButton = shallow(<DismissButton />);
    expect(aDismissButton).toMatchSnapshot();
  });
});
