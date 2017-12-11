import React from "react";
import { shallow } from "enzyme";
import DataValue from "./DataValue";

describe("DataValue", () => {
  it("matches snapshot", () => {
    const aDataValue = shallow(<DataValue />);
    expect(aDataValue).toMatchSnapshot();
  });
});
