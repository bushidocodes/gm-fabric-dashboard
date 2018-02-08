import { PropTypes } from "prop-types";
import React, { Fragment } from "react";
import { injectIntl, FormattedMessage } from "react-intl";

import DygraphContainer from "./components/DygraphWrapper";
import LineChartDisplay from "./components/LineChartDisplay";
import LineChartTitle from "./components/LineChartTitle";
import LineChartContent from "./components/LineChartContent";
import LineChartDetails from "./components/LineChartDetails";
import LineChartEmpty from "./components/LineChartEmpty";
import LineDetail from "./components/LineDetail";
import { screenReaderGraphDescription } from "./utils";
import Span from "components/Main/components/Span";
import Icon from "components/Icon";
import Glyph from "components/Glyphs/index";

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
  intl: PropTypes.object.isRequired,
  timeSeries: PropTypes.array,
  title: PropTypes.string.isRequired
};

GMLineChart.defaultProps = {
  height: "normal"
};

/**
 * Title, Dygraph-based chart, and optional lines of text
 * Validates timeseries data and displays error messages if a chart cannot be displayed.
 * @param {Object} props
 */
function GMLineChart({
  detailLines,
  expectedAttributes,
  height,
  timeSeries,
  title,
  intl
}) {
  return (
    <LineChartDisplay
      height={height}
      role="presentation"
      aria-label={
        timeSeries
          ? screenReaderGraphDescription(timeSeries, title, intl)
          : intl.formatMessage(
              {
                id: "GMLineChart.noChartableData",
                defaultMessage: "No Chartable Data",
                description: "Screen reader description for GMLineChart"
              },
              { title }
            )
      }
    >
      {title && <LineChartTitle aria-hidden={true}>{title}</LineChartTitle>}
      <LineChartContent aria-hidden={true}>
        {timeSeries[0].length === 0 ? (
          <LineChartEmpty>
            <h1>
              <Span>
                <Icon borderStyle="BorderTriangleSmall">
                  <Glyph name={"Exclamation"} />
                </Icon>
              </Span>
              <FormattedMessage
                id="GMLineChart.noChartableData"
                defaultMessage="No chartable data"
                description="Empty line chart message"
              />
            </h1>
            {expectedAttributes &&
              expectedAttributes.length > 0 && (
                <Fragment>
                  <FormattedMessage
                    id="GMLineChart.noMetricsFound"
                    defaultMessage="Could not find the following metrics:"
                    description="Empty line chart message"
                  />
                  <ul>
                    {expectedAttributes.map(attribute => (
                      <li key={attribute}>{attribute}</li>
                    ))}
                  </ul>
                </Fragment>
              )}
          </LineChartEmpty>
        ) : (
          <DygraphContainer timeSeries={timeSeries} />
        )}
      </LineChartContent>
      <LineChartDetails>
        {detailLines &&
          detailLines.map(element => (
            <LineDetail key={element}>{element}</LineDetail>
          ))}
      </LineChartDetails>
    </LineChartDisplay>
  );
}

export default injectIntl(GMLineChart);
