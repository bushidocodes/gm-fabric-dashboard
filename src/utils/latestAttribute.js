import _ from "lodash";
import { round, unit } from "mathjs";

// Dashboard Utility Functions

// The client-side Redux store expresses metrics over time as a hierarchy of JavaScript objects.
// At the lowest level, a metric is represented by a key of the metric name and a complex object
// representing the value of that metric over time. The complex object has keys
// equal to a UNIX timestamp and values equal to the value of the metric at the associated timestamp.
// When the client fetches metrics data from the server, the data is deconstructed and the value
// of each attribute is appended to the appropriate complex object with a key equal to the timestamp
// of when the fetched data was received from the server.

// These utility functions are provided to transform this data into time series, spark lines, and
// other data structures capable of being consumed by front-end components.

/**
 * Returns the most recent value of a particular attribute as a number or string
 * @param {Object} metrics - An arbitrary nested object passed from Redux via component props
 * @param {String} key - A string representation of the path to the desired key
 * @returns {Number|String}
 */

export function getLatestAttribute(
  metrics,
  key,
  precision,
  baseUnit,
  resultUnit
) {
  if (!metrics || !key) return 0;
  // _.has is not suitable because some object become arrays and auto insert
  // keys from 0...n with values of undefined.
  const fullPath = _.get(metrics, key);
  if (fullPath) {
    const latestAttribute =
      fullPath[_.last(_.keys(fullPath).sort((a, b) => a - b))];
    if (baseUnit && resultUnit && precision) {
      return round(
        unit(latestAttribute, baseUnit).toNumber(resultUnit),
        precision
      );
    } else if (precision) {
      return round(latestAttribute, precision);
    } else {
      return latestAttribute;
    }
  } else {
    return 0;
  }
}

/**
 * Helper function that inspects the JSON string format for type of 'latest',
 * retrieves the value if required, and formats as a string
 * @param {String[]|String} line 
 * @param {Object} metrics 
 */
export function parseJSONString(line, metrics) {
  if (Array.isArray(line)) {
    return line
      .map(element => {
        if (element.type === "string") {
          return element.value;
        } else if (
          element.type === "latest" &&
          element.baseUnit &&
          element.resultUnit &&
          element.precision
        ) {
          return getLatestAttribute(
            metrics,
            element.value,
            element.precision,
            element.baseUnit,
            element.resultUnit
          );
        } else {
          return getLatestAttribute(metrics, element.value).toLocaleString();
        }
      })
      .join(" ");
  } else {
    return line;
  }
}
