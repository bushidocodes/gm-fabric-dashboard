import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("matches snapshot", () => {
    const aErrorBoundary = shallow(<ErrorBoundary />);
    expect(aErrorBoundary).toMatchSnapshot();
  });
});
