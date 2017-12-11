import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";

describe("Message", () => {
  it("matches snapshot", () => {
    const aMessage = shallow(<Message />);
    expect(aMessage).toMatchSnapshot();
  });
});
