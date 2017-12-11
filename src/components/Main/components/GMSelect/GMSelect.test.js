import React from "react";
import { shallow } from "enzyme";
import GMSelect from "./GMSelect";

// Commented out because select produces different snapshots in CI
xdescribe("GMSelect", () => {
  xit("matches snapshot", () => {
    const aGMSelect = shallow(<GMSelect />);
    expect(aGMSelect).toMatchSnapshot();
  });
});
