import React from "react";
import { shallow } from "enzyme";
import DataPair from "./DataPair";

describe("DataPair", () => {
  it("matches snapshot when priority is primary", () => {
    const aDataPair = shallow(<DataPair priority="primary" />);
    expect(aDataPair).toMatchSnapshot();
  });
  it("matches snapshot when priority is normal", () => {
    const aDataPair = shallow(<DataPair priority="normal" />);
    expect(aDataPair).toMatchSnapshot();
  });
});
