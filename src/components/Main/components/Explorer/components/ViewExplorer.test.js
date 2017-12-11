import React from "react";
import { shallow } from "enzyme";
import ViewExplorer from "./ViewExplorer";

describe("ViewExplorer", () => {
  it("matches snapshot", () => {
    const aViewExplorer = shallow(<ViewExplorer />);
    expect(aViewExplorer).toMatchSnapshot();
  });
});
