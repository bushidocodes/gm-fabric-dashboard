import React from "react";
import { shallow } from "enzyme";
import ExtrasContainer from "./ExtrasContainer";

describe("ExtrasContainer", () => {
  it("matches snapshot", () => {
    const aExtrasContainer = shallow(<ExtrasContainer />);
    expect(aExtrasContainer).toMatchSnapshot();
  });
});
