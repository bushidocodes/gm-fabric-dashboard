import React from "react";
import { shallow } from "enzyme";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("matches snapshot", () => {
    const aNotFound = shallow(<NotFound />);
    expect(aNotFound).toMatchSnapshot();
  });
});
