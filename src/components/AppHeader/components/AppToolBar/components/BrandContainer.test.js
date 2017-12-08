import React from "react";
import { shallow } from "enzyme";
import BrandContainer from "./BrandContainer";

describe("BrandContainer", () => {
  it("matches snapshot", () => {
    const aBrandContainer = shallow(<BrandContainer />);
    expect(aBrandContainer).toMatchSnapshot();
  });
});
