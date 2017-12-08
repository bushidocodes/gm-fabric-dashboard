import React from "react";
import { shallow } from "enzyme";
import AppVersionLink from "./AppVersionLink";

describe("AppVersionLink", () => {
  it("matches snapshot", () => {
    const aAppVersionLink = shallow(<AppVersionLink />);
    expect(aAppVersionLink).toMatchSnapshot();
  });
});
