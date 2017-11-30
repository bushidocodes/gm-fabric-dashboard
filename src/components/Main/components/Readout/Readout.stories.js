import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, object } from "@storybook/addon-knobs";

import ReadoutGroup from "../ReadoutGroup";
import Readout from "./Readout";

const mockReadoutItem = [
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "30000%",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
];
const mockReadoutFewItems = [
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "57.838%",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Error Rate",
    value: "0.0012%",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
];

const mockReadoutManyItems = [
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "30000%",
    detail: "detail text 0",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "33000%",
    detail: "detail text 1 ",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "31000%",
    detail: "detail text 2",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    iconName: "ShapeIcon",
    iconShape: "triangle",
    iconColor: "rgba(0, 0, 0, 0.8)",
    title: "Avg. Response Time",
    value: "34000%",
    detail: "detail text 3",
    graphData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
      <Readout readoutItems={mockReadoutItem}>/></Readout>
      <Readout primary={true} readoutItems={mockReadoutFewItems} />
      <Readout readoutItems={mockReadoutFewItems}>/></Readout>
    </ReadoutGroup>
  ));
