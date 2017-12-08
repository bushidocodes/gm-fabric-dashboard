import React from "react";
import { shallow } from "enzyme";
import BrandLogo from "./BrandLogo";

describe("BrandLogo", () => {
  it("matches snapshot", () => {
    const aBrandLogo = shallow(<BrandLogo />);
    expect(aBrandLogo).toMatchSnapshot();
  });
});
