import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, object } from "@storybook/addon-knobs";

import ReadoutGroup from "../ReadoutGroup";
import Readout from "./Readout";

const mockReadoutItem = [
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "30000%"
  }
];
const mockReadoutFewItems = [
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "57.838%"
  },
  {
    icon: "Summary",
    title: "Error Rate",
    value: "0.0012%"
  }
];

const mockReadoutManyItems = [
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "30000%",
    detail: "detail text 0"
  },
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "33000%",
    detail: "detail text 1 "
  },
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "31000%",
    detail: "detail text 2"
  },
  {
    icon: "Summary",
    title: "Avg. Response Time",
    value: "34000%",
    detail: "detail text 3"
  }
];

storiesOf("Readout", module)
  .addDecorator(withKnobs)
  .add("Readout", () => (
    <Readout
      primary={boolean("Readout is Primary", false)}
      readoutItems={object("Readout Items", mockReadoutItem)}
    />
  ))
  .add("A Readout with Many Items ", () => (
    <Readout
      primary={boolean("Readout is Primary", false)}
      readoutItems={object("Readout Items", mockReadoutManyItems)}
    />
  ))
  .add("A Readout Group", () => (
    <ReadoutGroup>
      <Readout readoutItems={mockReadoutItem} />
      <Readout primary={true} readoutItems={mockReadoutFewItems} />
      <Readout readoutItems={mockReadoutFewItems} />
    </ReadoutGroup>
  ));
