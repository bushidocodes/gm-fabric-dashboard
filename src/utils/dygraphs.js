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
  // console.log("Getting ", metrics, keys, "with ", labels);
  if (!metrics || !keys) return [results, options];
  // Fallback to using keys directly if labels not present for every key
  let resLabels = labels.length === keys.length ? labels : keys;
  // Not all keys will be present at all times in the metrics object
  const validKeys = keys.filter(key => Object.keys(metrics).includes(key));
  // Match up labels to keys to maintain matching indices
  const validLabels = [];
  validKeys.forEach(key => {
    const idx = keys.indexOf(key);
    validLabels.push(labels[idx]);
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
  // console.log({ labels: ["time", ...resLabels] });
  options.labels = ["time", ...resLabels];
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
  console.log("Calling map to net change with ", dygraphData, labelsToMap);
  return _mapOverDygraphKeys(dygraphData, labelsToMap, _netChangeMapper);
}

function _mapOverDygraphKeys(dygraphData, labelsToMap, mapperFunc) {
  if (!labelsToMap || labelsToMap.length === 0) {
    return dygraphData;
  } else {
    let data = cloneDeep(dygraphData);
    const [originalResults, { labels }] = data;
    labelsToMap.forEach((labelToMap, idx, arr) => {
      const positionOfLabelToMap = labels.indexOf(labelToMap);
      if (positionOfLabelToMap !== -1) {
        console.log("ORIG", originalResults);
        data[0] = data[0].map((val, i, a) =>
          mapperFunc(val, i, a, positionOfLabelToMap)
        );
      }
    });
    console.log("Mapping returning ", data);
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
    console.log("elapsed", (currentTime - lastTime) / 1000);
    const netChange = Math.round(
      (currentVal - lastVal) / ((currentTime - lastTime) / 1000)
    );
    console.log("net change", netChange);
    console.log(typeof positionOfLabelToMap);
    result[positionOfLabelToMap] = netChange;
    console.log(result);
    return result;
  }
}
