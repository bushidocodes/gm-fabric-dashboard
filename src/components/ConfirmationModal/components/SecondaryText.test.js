import React from "react";
import { shallow } from "enzyme";
import SecondaryText from "./SecondaryText";

describe("SecondaryText", () => {
  it("matches snapshot", () => {
    const aSecondaryText = shallow(<SecondaryText />);
    expect(aSecondaryText).toMatchSnapshot();
  });
});
