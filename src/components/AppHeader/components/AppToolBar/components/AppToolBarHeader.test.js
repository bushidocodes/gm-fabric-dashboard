import React from "react";
import { shallow } from "enzyme";
import AppToolBarHeader from "./AppToolBarHeader";

describe("AppToolBarHeader", () => {
  it("matches snapshot", () => {
    const aAppToolBarHeader = shallow(<AppToolBarHeader />);
    expect(aAppToolBarHeader).toMatchSnapshot();
  });
});
