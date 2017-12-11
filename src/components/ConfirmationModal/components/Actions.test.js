import React from "react";
import { shallow } from "enzyme";
import Actions from "./Actions";

describe("Actions", () => {
  it("matches snapshot", () => {
    const aActions = shallow(<Actions />);
    expect(aActions).toMatchSnapshot();
  });
});
