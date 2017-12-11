import React from "react";
import { shallow } from "enzyme";
import Content from "./Content";

describe("Content", () => {
  it("matches snapshot", () => {
    const aContent = shallow(<Content />);
    expect(aContent).toMatchSnapshot();
  });
});
