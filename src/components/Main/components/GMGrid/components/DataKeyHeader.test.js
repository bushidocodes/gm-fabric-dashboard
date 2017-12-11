import React from "react";
import { shallow } from "enzyme";
import DataKeyHeader from "./DataKeyHeader";

describe("DataKeyHeader", () => {
  it("matches snapshot", () => {
    const aDataKeyHeader = shallow(<DataKeyHeader />);
    expect(aDataKeyHeader).toMatchSnapshot();
  });
});
