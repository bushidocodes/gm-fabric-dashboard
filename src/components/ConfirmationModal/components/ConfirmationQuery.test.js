import React from "react";
import { shallow } from "enzyme";
import ConfirmationQuery from "./ConfirmationQuery";

describe("ConfirmationQuery", () => {
  it("matches snapshot", () => {
    const aConfirmationQuery = shallow(<ConfirmationQuery />);
    expect(aConfirmationQuery).toMatchSnapshot();
  });
});
