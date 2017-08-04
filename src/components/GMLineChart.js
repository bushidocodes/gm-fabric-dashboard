import { PropTypes } from "prop-types";
import React from "react";

import DygraphContainer from "./DygraphContainer";

/**
 * Reuseable Dygraph-based Line Chart component for rendering a time series
 *
 * Required Props include title (the string to show at that top of the card) and time series (the data to render).
 * Optional props include any number of detailLines, an array of strings listed below the line chart.
 */

GMLineChart.propTypes = {
  detailLines: PropTypes.array.isRequired,
  expectedAttributes: PropTypes.array.isRequired,
  timeSeries: PropTypes.array,
  title: PropTypes.string.isRequired
};

export default function GMLineChart({
  detailLines,
  expectedAttributes,
  timeSeries,
  title
}) {
  console.log(timeSeries);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ paddingLeft: "15px", paddingTop: "3px" }}>
        {title}
      </h3>
      <div style={{ width: "100%", height: "70%" }}>
        {timeSeries[0].length === 0
          ? <div style={{ paddingLeft: "15px" }}>
              <div>No Data to Chart</div>
              {expectedAttributes &&
                expectedAttributes.length > 0 &&
                <div>
                  These expected metrics were not found:
                  <ul>
                    {expectedAttributes.map(attribute =>
                      <li key={attribute}>
                        {attribute}
                      </li>
                    )}
                  </ul>
                </div>}
            </div>
          : <DygraphContainer timeSeries={timeSeries} />}
      </div>
      {detailLines &&
        detailLines.map(element =>
          <div key={element} style={{ paddingLeft: "15px" }}>
            {element}
          </div>
        )}
    </div>
  );
}
