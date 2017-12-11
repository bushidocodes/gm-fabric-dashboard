import React from "react";
import { shallow } from "enzyme";
import MessageIconContainer from "./MessageIconContainer";

describe("MessageIconContainer", () => {
  it("matches snapshot", () => {
    const aMessageIconContainer = shallow(<MessageIconContainer />);
    expect(aMessageIconContainer).toMatchSnapshot();
  });
});
