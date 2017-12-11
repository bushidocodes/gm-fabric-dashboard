import React from "react";
import { shallow } from "enzyme";
import DataKey from "./DataKey";

describe("DataKey", () => {
  it("matches snapshot", () => {
    const aDataKey = shallow(<DataKey />);
    expect(aDataKey).toMatchSnapshot();
  });
});
