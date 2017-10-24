import React from "react";

import { storiesOf } from "@storybook/react";

import {
  ReadoutDashboard,
  ReadoutContainer,
  ReadoutItem,
  ReadoutItemData,
  ReadoutItemTitle,
  ReadoutItemValue,
  ReadoutItemDetail,
  ReadoutItemIcon
} from "../src/components/ReadoutBeta";
import ShapeIcon from "../src/components/ShapeIcon";

storiesOf("Readout", module)
  .add("A Readout with One Item", () => (
    <ReadoutContainer>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
    </ReadoutContainer>
  ))
  .add("A Primary Readout with One Item", () => (
    <ReadoutContainer primary="true">
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(255,255,255,.95)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
    </ReadoutContainer>
  ))
  .add("A Readout with Many Items ", () => (
    <ReadoutContainer>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>Uptime</ReadoutItemTitle>
          <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
          <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
    </ReadoutContainer>
  ))
  .add("A Readout Dashboard with Typical Content", () => (
    <ReadoutDashboard>
      <ReadoutContainer>
        <ReadoutItem>
          <ReadoutItemIcon>
            <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />
          </ReadoutItemIcon>
          <ReadoutItemData>
            <ReadoutItemTitle>Uptime</ReadoutItemTitle>
            <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
            <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
          </ReadoutItemData>
        </ReadoutItem>
      </ReadoutContainer>
      <ReadoutContainer primary="true">
        <ReadoutItem>
          <ReadoutItemIcon>
            <ShapeIcon shape="triangle" color="rgba(255,255,255,.95)" />
          </ReadoutItemIcon>
          <ReadoutItemData>
            <ReadoutItemTitle>Uptime</ReadoutItemTitle>
            <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
            <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
          </ReadoutItemData>
        </ReadoutItem>
        <ReadoutItem>
          <ReadoutItemIcon>
            <ShapeIcon shape="triangle" color="rgba(255,255,255,.95)" />
          </ReadoutItemIcon>
          <ReadoutItemData>
            <ReadoutItemTitle>Uptime</ReadoutItemTitle>
            <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
            <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
          </ReadoutItemData>
        </ReadoutItem>
      </ReadoutContainer>
      <ReadoutContainer>
        <ReadoutItem>
          <ReadoutItemIcon>
            <ShapeIcon shape="triangle" color="rgba(0,0,0,.8)" />{" "}
          </ReadoutItemIcon>
          <ReadoutItemData>
            <ReadoutItemTitle>Uptime</ReadoutItemTitle>
            <ReadoutItemValue>6h 7m 31 s</ReadoutItemValue>
            <ReadoutItemDetail>Thu Oct 19 2017 09:56:42</ReadoutItemDetail>
          </ReadoutItemData>
        </ReadoutItem>
      </ReadoutContainer>
    </ReadoutDashboard>
  ));
