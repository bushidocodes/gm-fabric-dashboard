import { cloneDeep, uniq } from "lodash";

/**
 * Returns time series data of one or more in Dygraph format
 * Note that this requires all metrics to occur at the same timestamp
 * See http://dygraphs.com/data.html#array
 *
 * @param {Object} metrics - metric
 * @param {String[]} keys - keys that we want to pluck from metrics
 * @param {String[]} labels - label to apply to key at same index
 * @returns {Array}
 */
export function getDygraphOfValue(metrics, keys, labels = []) {
  let results = [];
  const options = { labels: [] };
  if (!metrics || !keys) return [results, options];
  // Fallback to using keys directly if labels not present for every key
  let resLabels = labels.length === keys.length ? labels : keys;
  // Not all keys will be present at all times in the metrics object
  const validKeys = keys.filter(key => Object.keys(metrics).includes(key));
  // Match up labels to keys to maintain matching indices
  const validLabels = [];
  validKeys.forEach(key => {
    const idx = keys.indexOf(key);
    validLabels.push(resLabels[idx]);
  });
  // Exit with dummy output if none of the keys were in the metrics object
  if (validKeys.length === 0) return [results, options];
  // Accumulate all unique timestamps and sort
  const timestamps = validKeys.reduce((acc, key) => {
    return uniq([...acc, ...Object.keys(metrics[key])]).sort((a, b) => a - b);
  }, []);
  // Map over the timestamps and generate the dygraph format
  results = timestamps.map(ts => {
    return [new Date(Number(ts)), ...validKeys.map(key => metrics[key][ts])];
  });
  options.labels = ["time", ...validLabels];
  return [results, options];
}

/**
 * Returns time series data of one or more in Dygraph format
 * Note that this requires all metrics to occur at the same timestamp
 * See http://dygraphs.com/data.html#array
 *
 * @param {Object[]} dygraphData - valid dygraph data object returned by getDygraphOfValue
 * @param {String[]} labelsToMap - keys that we want to map over and change from value to net change
 * @returns {Object[]}
 */
export function mapDygraphKeysToNetChange(dygraphData, labelsToMap) {
  return _mapOverDygraphKeys(dygraphData, labelsToMap, _netChangeMapper);
}

function _mapOverDygraphKeys(dygraphData, labelsToMap, mapperFunc) {
  if (!labelsToMap || labelsToMap.length === 0) {
    return dygraphData;
  } else {
    let data = cloneDeep(dygraphData);
    const [, { labels }] = data;
    labelsToMap.forEach((labelToMap, idx, arr) => {
      const positionOfLabelToMap = labels.indexOf(labelToMap);
      if (positionOfLabelToMap !== -1) {
        data[0] = data[0].map((val, i, a) =>
          mapperFunc(val, i, a, positionOfLabelToMap)
        );
      }
    });
    return data;
  }
}

function _netChangeMapper(val, idx, arr, positionOfLabelToMap) {
  if (idx === 0) {
    const result = [...val];
    result[positionOfLabelToMap] = 0;
    return result;
  } else {
    const lastVal = arr[idx - 1][positionOfLabelToMap];
    const lastTime = arr[idx - 1][0];
    const currentVal = val[positionOfLabelToMap];
    const currentTime = val[0];
    const result = [...val];
    const netChange = floatRound(
      (currentVal - lastVal) / ((currentTime - lastTime) / 1000),
      3
    );
    // Our net change calculation may sometimes generate a negative value. This is
    // undesired from a visual perspective because a chart's net change should never
    // be below zero. If we detect a negative value then return zero to maintain
    // a sane looking chart.
    result[positionOfLabelToMap] = netChange < 0 ? 0 : netChange;
    return result;
  }
}

/**
 * Rounds a number to a certain number of decimal places;
 *
 * @param {number} val
 * @param {number} numberOfDecimalsPlaces
 * @returns
 */
export function floatRound(val, numberOfDecimalsPlaces) {
  const multiplier = Math.pow(10, numberOfDecimalsPlaces);
  return Math.round(val * multiplier) / multiplier;
}
