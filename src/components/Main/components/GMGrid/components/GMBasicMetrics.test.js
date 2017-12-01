import React from "react";
import { shallow } from "enzyme";
import GMBasicMetrics from "./GMBasicMetrics";

let wrapper;
const props = {
  detailLines: [
    [
      "2XX",
      3468388,
      "primary",
      [3468388, 3468388, 3468388, 3468388, 3468388, 3468388, 3468388]
    ],
    [
      "200",
      3468388,
      "primary",
      [3468388, 3468388, 3468388, 3468388, 3468388, 3468388, 3468388]
    ],
    ["4XX", 12, "normal", [12, 12, 12, 12, 12, 12, 12]],
    ["400", 8, "normal", [8, 8, 8, 8, 8, 8, 8]],
    ["499", 4, "normal", [4, 4, 4, 4, 4, 4, 4, 4]],
    ["5XX", 16, "normal", [16, 16, 16, 16, 16, 16, 16]],
    ["500", 16, "normal", [16, 16, 16, 16, 16, 16, 16]]
  ],
  title: "Response Status Codes"
};
describe("<GMBasicMetrics> stateless child component of GMGrid", () => {
  beforeEach(() => {
    wrapper = shallow(<GMBasicMetrics {...props} />);
  });

  test("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
