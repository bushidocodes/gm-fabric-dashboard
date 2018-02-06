import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, select, object, text } from "@storybook/addon-knobs/react";

import GMLineChart from "./GMLineChart";

const props = {
  detailLines: ["Total Loaded: 10,200", "Total Unloaded: 19"],
  timeSeries: [
    [
      [new Date("Wed Nov 29 2017 18:45:51 GMT-0500 (EST)"), 10181],
      [new Date("Wed Nov 29 2017 18:46:51 GMT-0500 (EST)"), 9181],
      [new Date("Wed Nov 29 2017 18:47:51 GMT-0500 (EST)"), 7181],
      [new Date("Wed Nov 29 2017 18:48:51 GMT-0500 (EST)"), 5181],
      [new Date("Wed Nov 29 2017 18:49:51 GMT-0500 (EST)"), 10181],
      [new Date("Wed Nov 29 2017 18:50:51 GMT-0500 (EST)"), 9181]
    ],
    { labels: ["time", "# of currently loaded JVM Classes"] }
  ],
  expectedAttributes: ["jvm/classes/current_loaded"],
  height: "xs"
};

storiesOf("GMLineChart", module)
  .addDecorator(withKnobs)
  .add("GMLineChart", () => {
    const title = text("Title", "Awesomeness Factor");
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
      labels: ["time", "# of currently loaded JVM Classes"],
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
    props.detailLines = detailLines;
    props.timeSeries[1] = dygraphOptions;
    return <GMLineChart {...props} title={title} height={height} />;
  });
//height: PropTypes.oneOf(["xs", "sm", "normal", "lg", "xl", "max"]
