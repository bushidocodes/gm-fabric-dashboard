import React from "react";
import mockState from "json/mockReduxState";
import configureStore from "redux-mock-store";
import { renderWithIntl, shallowWithIntl } from "utils/i18nTesting";

import LayoutSection from "components/LayoutSection";
import GMLineChart from "components/Main/components/GMLineChart";
import Readout from "components/Main/components/Readout";
import ErrorBoundary from "components/ErrorBoundary";

import SummaryGrid from "./Summary";

const mockStore = configureStore()(mockState);

let SummaryGridWrap;

describe("JVM > SummaryGrid component", () => {
  beforeEach(() => {
    SummaryGridWrap = shallowWithIntl(<SummaryGrid store={mockStore} />);
  });

  test("Matched the snapshot", () => {
    const tree = renderWithIntl(<SummaryGrid store={mockStore} />);
    expect(tree).toMatchSnapshot();
  });

  test("Has an error boundary", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(ErrorBoundary).length
    ).toBe(1);
  });

  test("Has a layout section that contains 'vital' dashboards", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(LayoutSection)
        .find({ title: "Vitals" })
    ).toHaveLength(1);
  });

  test("Has a read out group that contains three readout dashboards", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(Readout)
    ).toHaveLength(4);
  });

  test("Has an 'uptime' dashboard in first position", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(Readout)
        .at(0)
        .html()
        .includes("Uptime")
    ).toBe(true);
  });

  test("Has an 'average response time' dashboard in second position", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(Readout)
        .at(1)
        .html()
        .includes("Avg. Response Time")
    ).toBe(true);
  });

  test("Has an 'error rate' dashboard in third position", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(Readout)
        .at(2)
        .html()
        .includes("Error Rate")
    ).toBe(true);
  });

  test("Has a 'host CPU utilized' dashboard in fourth position", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(Readout)
        .at(3)
        .html()
        .includes("Host CPU Cores")
    ).toBe(true);
  });

  test("Has a chart with correct props passed down", () => {
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(GMLineChart).length
    ).toBe(1);
    expect(
      Object.keys(
        SummaryGridWrap.dive()
          .dive()
          .find(GMLineChart)
          .props()
      ).includes("dygraph")
    ).toBe(true);
    expect(
      SummaryGridWrap.dive()
        .dive()
        .find(GMLineChart)
        .props()
        .dygraph.attributes.includes("Time")
    ).toBe(true);
  });
});
