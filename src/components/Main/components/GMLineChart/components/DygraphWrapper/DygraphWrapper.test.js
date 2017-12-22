import React from "react";
import { render } from "enzyme";
import DygraphWrapper from "./DygraphWrapper";

const timeSeries = [
  [
    [new Date("Thu Dec 21 2017 10:35:51 GMT-0500 (EST)"), 10181],
    [new Date("Thu Dec 21 2017 10:35:56 GMT-0500 (EST)"), 1081],
    [new Date("Thu Dec 21 2017 10:36:56 GMT-0500 (EST)"), 2091],
    [new Date("Thu Dec 21 2017 10:37:56 GMT-0500 (EST)"), 10021]
  ],
  { labels: ["time", "# of currently loaded JVM Classes"] }
];
const detailLines = [];

describe("DygraphWrapper", () => {
  it("matches default snapshot", () => {
    const aDygraphWrapper = render(<DygraphWrapper timeSeries={timeSeries} />);
    expect(aDygraphWrapper).toMatchSnapshot();
  });
});
