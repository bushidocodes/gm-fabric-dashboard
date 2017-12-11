import React from "react";
import { shallow } from "enzyme";
import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("matches snapshot", () => {
    const aBreadcrumbs = shallow(<Breadcrumbs />);
    expect(aBreadcrumbs).toMatchSnapshot();
  });
});
