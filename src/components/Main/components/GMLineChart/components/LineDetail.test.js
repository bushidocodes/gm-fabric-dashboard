import React from "react";
import { shallow } from "enzyme";
import LineDetail from "./LineDetail";

describe("LineDetail", () => {
  it("matches snapshot", () => {
    const aLineDetail = shallow(<LineDetail />);
    expect(aLineDetail).toMatchSnapshot();
  });
});
