import React from "react";
import { shallow } from "enzyme";
import StyledModal from "./StyledModal";

describe("StyledModal", () => {
  it("matches snapshot", () => {
    const aStyledModal = shallow(<StyledModal />);
    expect(aStyledModal).toMatchSnapshot();
  });
});
