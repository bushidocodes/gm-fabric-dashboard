import React from "react";
import { shallow } from "enzyme";
import GMSearchInput from "./GMSearchInput";

describe("GMSearchInput", () => {
  it("matches snapshot", () => {
    const aGMSearchInput = shallow(<GMSearchInput />);
    expect(aGMSearchInput).toMatchSnapshot();
  });
});
