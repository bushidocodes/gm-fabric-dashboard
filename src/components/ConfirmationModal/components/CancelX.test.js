import React from "react";
import { shallow } from "enzyme";
import CancelX from "./CancelX";

describe("CancelX", () => {
  it("matches snapshot", () => {
    const aCancelX = shallow(<CancelX />);
    expect(aCancelX).toMatchSnapshot();
  });
});
