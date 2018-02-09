import React from "react";

import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  number,
  select,
  object,
  text
} from "@storybook/addon-knobs/react";

import GMLineChart from "./GMLineChart";

storiesOf("GMLineChart", module)
  .addDecorator(withKnobs)
  .add("GMLineChart", () => {
    const title = text("Title", "Awesomeness Factor");
    const baseUnit = text("Base Unit", "B");
    const resultUnit = text("Result Unit", "MB");
    const label = text("Y Axis Label", "Heap Used");
    const precision = number("# Decimals", 3);
    const detailLines = object("Detail Lines", [
      "Total Loaded: 10,200",
      "Total Unloaded: 19"
    ]);
    const dygraphOptions = object("Dygraph Options", {
      animatedZooms: true,
      axisLineColor: "rgb(200, 200, 200)",
      colors: ["#0aab2a", "#002e6e", "#FF5733"],
      drawAxesAtZero: true,
      gridLineColor: "rgb(200, 200, 200)",
      gridLinePattern: [1, 3],
      includeZero: true,
      labelsSeparateLines: true,
      labelsKMB: true,
      fillGraph: true,
      strokeWidth: 2.0,
      legend: "always"
    });
    const height = select(
      "Height",
      { xs: "xs", sm: "sm", normal: "normal", lg: "lg", xl: "xl", max: "max" },
      "normal"
    );
    const dygraphMetadata = {
      "wakka/wakka/heap_used": {
        baseUnit: baseUnit,
        label: label,
        precision: precision,
        resultUnit: resultUnit
      }
    };
    return (
      <GMLineChart
        detailLines={detailLines}
        dygraph={{
          data: [
            [new Date("Wed Nov 29 2017 18:45:51 GMT-0500 (EST)"), 10181],
            [new Date("Wed Nov 29 2017 18:46:51 GMT-0500 (EST)"), 9181],
            [new Date("Wed Nov 29 2017 18:47:51 GMT-0500 (EST)"), 7181],
            [new Date("Wed Nov 29 2017 18:48:51 GMT-0500 (EST)"), 5181],
            [new Date("Wed Nov 29 2017 18:49:51 GMT-0500 (EST)"), 10181],
            [new Date("Wed Nov 29 2017 18:50:51 GMT-0500 (EST)"), 9181]
          ],
          attributes: ["wakka/wakka/heap_used"]
        }}
        dygraphMetadata={dygraphMetadata}
        dygraphOptions={dygraphOptions}
        expectedAttributes={["wakka/wakka/heap_used"]}
        height={height}
        title={title}
      />
    );
  });
