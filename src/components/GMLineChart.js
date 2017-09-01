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
  detailLines: PropTypes.array,
  expectedAttributes: PropTypes.array,
  height: PropTypes.oneOf(["xs", "sm", "normal", "lg", "xl", "max"]),
  timeSeries: PropTypes.array,
  title: PropTypes.string.isRequired
};

GMLineChart.defaultProps = {
  height: "normal"
};

export default function GMLineChart({
  detailLines,
  expectedAttributes,
  height,
  timeSeries,
  title
}) {
  return (
    <div
      className={"chart line-chart" + (height && ` chart-height-${height}`: "")}
    >
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-content">
        {timeSeries[0].length === 0 ? (
          <div className="chart-empty">
            <h1>
              <i data-uk-icon={`icon: warning`} /> No Chartable Data
            </h1>
            {expectedAttributes &&
            expectedAttributes.length > 0 && (
              <div>
                <p>Could not find the following metrics:</p>
                <ul>
                  {expectedAttributes.map(attribute => (
                    <li key={attribute}>{attribute}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <DygraphContainer timeSeries={timeSeries} />
        )}
      </div>
      <div className="chart-details">
        {detailLines &&
          detailLines.map(element => (
            <div className="chart-detail" key={element}>
              {element}
            </div>
          ))}
      </div>
    </div>
  );
}
