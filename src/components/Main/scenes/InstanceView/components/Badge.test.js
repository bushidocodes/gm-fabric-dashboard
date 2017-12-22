import React from "react";
import { shallow } from "enzyme";
import Badge from "./Badge";

describe("Badge", () => {
  it("matches snapshot", () => {
    const aBadge = shallow(<Badge />);
    expect(aBadge).toMatchSnapshot();
  });
});
