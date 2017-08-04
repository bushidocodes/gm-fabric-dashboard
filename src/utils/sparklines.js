import { toPairs } from "lodash";

/**
 * Returns spark line of a metric's value
 * 
 * @param {Object} metrics - An arbitrary nested object passed from Redux via component props
 * @param {String} key - A string representation of the path to the desired key
 * @returns {Array}
 */
export function getSparkLineOfValue(metrics, key) {
  if (!metrics || !key) return [0, 0];
  const [, values] = toPairs(metrics[key]); //ignore value at index 0
  if (!values || values.length < 2) return [0, 0];
  return values;
}

/**
 * Returns sparkline of a metric's net change since that last time the metric was polled
 * 
 * @param {Object} metrics - An arbitrary nested object passed from Redux via component props
 * @param {String} key - A string representation of the path to the desired key
 * @returns {Array}
 */
export function getSparkLineOfNetChange(metrics, key) {
  if (!metrics || !key) return [0, 0];
  const [, values] = toPairs(metrics[key]); // Ignoring the keys
  if (!values || values.length < 2) return [0, 0];
  // Map over the arrays to compute the net change, and drop the first value
  return values
    .map((value, idx, arr) => {
      return idx === 0 ? 0 : value - arr[idx - 1];
    })
    .slice(1);
}
