import _ from "lodash";

export const INSTANCE_ID_LENGTH = 8;

/**
 * Takes a lengthy UID and returns a substring of desired length containing the
 * least significant (rightmost) possible characters
 * @param {string} id
 * @param {number} desiredLength
 */
export const trimID = (id, desiredLength = INSTANCE_ID_LENGTH) => {
  if (!id) return "";
  const strID = String(id);
  if (!desiredLength || desiredLength >= strID.length) return strID;
  return strID.slice(strID.length - desiredLength);
};

/**
 * Clears the interval with the ID stored at window.refreshMetricsIntervalID and then
 * wipes window.refreshMetricsIntervalID
 */
export function clearInstanceIntervalIfNeeded() {
  if (window.refreshMetricsIntervalID) {
    clearInterval(window.refreshMetricsIntervalID);
    window.refreshMetricsIntervalID = null;
  }
}

/**
 * Clears the interval with the ID stored at window.refreshFabricIntervalID and then
 * wipes window.refreshFabricIntervalID
 */
export function clearFabricIntervalIfNeeded() {
  if (window.refreshFabricIntervalID) {
    clearInterval(window.refreshFabricIntervalID);
    window.refreshFabricIntervalID = null;
  }
}
/**
 * Takes milliseconds and returns a human readable string of time
 * 7620940771 => '88d 04h 55m 41s'
 * @param {number} ms
 * @returns {string}
 */
export const convertMS = (ms = 0) => {
  if (typeof ms !== "number") {
    console.log("Wrong paramater is passed to function");
    return;
  }
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  s = s % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  let d = Math.floor(h / 24);
  h = h % 24;

  [d, h, m, s] = [d, h, m, s].map(el => {
    if (el === 0) return "00";
    else if (el < 10) return `0${el}`;
    else return el;
  });
  return `${d}d ${h}h ${m}m ${s}s`;
};

/**
 * Takes array of objects (example: array of routes objects) and key (number of requests) and returns a new object with the new field 'relativeReqPercent' added.
 * If Route A has 1000 requests per second, Route B has 500 requests per second, and Route C has 10 requests per second, Route A's bar is at 100%, Route B's bar is at 50%, and Route C's bar is at 1%.
 * The maximum value is value of the route with the highest number of requests.
 * 'relativeReqPercent' is percent representation of the percent difference without % symbol (50%)
 * @param {array, string}
 * @returns {array}
 */
export const relativeReqPercent = (arrObj = [], key = "") => {
  if (_.isEmpty(arrObj) || key === "") return arrObj;
  let max = _.max(_.map(arrObj, key));

  return _.map(arrObj, el =>
    _.extend({}, el, { relativeReqPercent: el[key] / max * 100 })
  );
};
