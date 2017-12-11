import React from "react";
import { shallow } from "enzyme";
import InspectorSearch from "./InspectorSearch";

describe("InspectorSearch", () => {
  it("matches snapshot", () => {
    const aInspectorSearch = shallow(<InspectorSearch />);
    expect(aInspectorSearch).toMatchSnapshot();
  });
});
