import React from "react";
import { shallow } from "enzyme";
import ReadoutItemIconStyle from "./ReadoutItemIconStyle";

describe("ReadoutItemIconStyle", () => {
  it("matches snapshot", () => {
    const aReadoutItemIconStyle = shallow(<ReadoutItemIconStyle />);
    expect(aReadoutItemIconStyle).toMatchSnapshot();
  });
});
