import React from "react";
import { shallow } from "enzyme";
import BrandText from "./BrandText";

describe("BrandText", () => {
  it("matches snapshot", () => {
    const aBrandText = shallow(<BrandText />);
    expect(aBrandText).toMatchSnapshot();
  });
});
