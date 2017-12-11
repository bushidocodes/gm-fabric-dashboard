import React from "react";
import { shallow } from "enzyme";
import DataDisplay from "./DataDisplay";

describe("DataDisplay", () => {
  it("matches snapshot when table is false", () => {
    const aDataDisplay = shallow(<DataDisplay table={false} />);
    expect(aDataDisplay).toMatchSnapshot();
  });
  it("matches snapshot when table is true", () => {
    const aDataDisplay = shallow(<DataDisplay table={true} />);
    expect(aDataDisplay).toMatchSnapshot();
  });
});
