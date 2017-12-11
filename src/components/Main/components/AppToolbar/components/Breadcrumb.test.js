import React from "react";
import { shallow } from "enzyme";
import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("matches snapshot", () => {
    const aBreadcrumb = shallow(<Breadcrumb />);
    expect(aBreadcrumb).toMatchSnapshot();
  });
});
