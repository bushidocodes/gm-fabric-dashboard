import React from "react";

import { storiesOf } from "@storybook/react";

import ReadoutItem from "../src/components/Main/components/ReadoutItem";

import Readout from "../src/components/Main/components/Readout";

import ReadoutGroup from "../src/components/Main/components/ReadoutGroup";

storiesOf("Readout", module)
  .add("A Readout with One Item", () => (
    <Readout>
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />
    </Readout>
  ))
  .add("A Primary Readout with One Item", () => (
    <Readout primary="true">
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />
    </Readout>
  ))
  .add("A Readout with Many Items ", () => (
    <Readout>
      {" "}
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />{" "}
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />{" "}
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />
    </Readout>
  ))
  .add("A Readout Group with Typical Content", () => (
    <ReadoutGroup>
      <Readout>
        {" "}
        <ReadoutItem
          iconName={"ShapeIcon"}
          iconShape={"triangle"}
          iconColor={"rgba(0, 0, 0, 0.8)"}
          title={"Avg. Response Time"}
          value={"30000%"}
          detail={"detail text"}
        />
      </Readout>
      <Readout primary="true">
        {" "}
        <ReadoutItem
          iconName={"ShapeIcon"}
          iconShape={"triangle"}
          iconColor={"rgba(0, 0, 0, 0.8)"}
          title={"Avg. Response Time"}
          value={"30000%"}
          detail={"detail text"}
        />{" "}
        <ReadoutItem
          iconName={"ShapeIcon"}
          iconShape={"triangle"}
          iconColor={"rgba(0, 0, 0, 0.8)"}
          title={"Avg. Response Time"}
          value={"30000%"}
          detail={"detail text"}
        />
      </Readout>
      <Readout>
        {" "}
        <ReadoutItem
          iconName={"ShapeIcon"}
          iconShape={"triangle"}
          iconColor={"rgba(0, 0, 0, 0.8)"}
          title={"Avg. Response Time"}
          value={"30000%"}
          detail={"detail text"}
        />
      </Readout>
    </ReadoutGroup>
  ))
  .add("A Readout with sparkline and without detail", () => (
    <Readout>
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        graphData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </Readout>
  ))
  .add("A Readout with detail and without sparkline", () => (
    <Readout>
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
      />
    </Readout>
  ))
  .add("A Readout with both detail and sparkline", () => (
    <Readout>
      {" "}
      <ReadoutItem
        iconName={"ShapeIcon"}
        iconShape={"triangle"}
        iconColor={"rgba(0, 0, 0, 0.8)"}
        title={"Avg. Response Time"}
        value={"30000%"}
        detail={"detail text"}
        graphData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </Readout>
  ));
