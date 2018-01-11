import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs/react";

import LayoutSection from "./LayoutSection";
import Readout from "components/Main/components/Readout";
import ReadoutGroup from "components/Main/components/ReadoutGroup";

const glyphNames = [
  "Bars",
  "Bell",
  "CPU",
  "Card",
  "Cog",
  "Configuration",
  "Docs",
  "EKG",
  "EditGraph",
  "ErrorList",
  "Exclamation",
  "Explorer",
  "Fabric",
  "Finagle",
  "GRPC",
  "GitHub",
  "Http",
  "Info",
  "Instances",
  "JVM",
  "Key",
  "LinkedIn",
  "Memory",
  "Negation",
  "Pause",
  "Person",
  "Play",
  "Poll",
  "Power",
  "Rows",
  "RunningSmall",
  "Scale",
  "Scatterplot",
  "Service",
  "ServiceInstance",
  "ServicesWhite",
  "StarFilled",
  "Summary",
  "Tape",
  "Threads",
  "Timer",
  "ViewCollapse",
  "GET",
  "PUT",
  "POST",
  "DELETE",
  "PATCH"
];

storiesOf("Layout Section", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    return (
      <LayoutSection
        title={text("Title", "Test Layout")}
        icon={select("Icon", glyphNames, "CPU")}
        flex={boolean("Flex")}
      >
        <ReadoutGroup>
          <Readout
            readoutItems={[
              {
                title: "Uptime",
                value: "1000ms"
              }
            ]}
          />
          <Readout
            primary
            readoutItems={[
              {
                title: "Error Rate",
                value: "0.000%",
                icon: "Summary"
              }
            ]}
          />
          <Readout
            readoutItems={[
              {
                title: "Host CPU Cores",
                value: "0"
              }
            ]}
          />
        </ReadoutGroup>
      </LayoutSection>
    );
  });
