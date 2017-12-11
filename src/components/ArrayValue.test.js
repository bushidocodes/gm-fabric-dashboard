import React from "react";
import { shallow } from "enzyme";
import ArrayValue from "./ArrayValue";

describe("ArrayValue", () => {
  it("matches snapshot", () => {
    const aArrayValue = shallow(<ArrayValue />);
    expect(aArrayValue).toMatchSnapshot();
  });
});
