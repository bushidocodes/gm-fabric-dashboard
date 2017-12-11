import React from "react";
import { shallow } from "enzyme";
import MessageIcon from "./MessageIcon";

describe("MessageIcon", () => {
  it("matches snapshot", () => {
    const aMessageIcon = shallow(<MessageIcon />);
    expect(aMessageIcon).toMatchSnapshot();
  });
});
