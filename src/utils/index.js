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

/**
 * Utility function to calculate and format a string containing the error percent
 * of a metric
 * @export
 * @param {number} requests
 * @param {number} errors
 * @returns string
 */
export function calculateErrorPercent(requests, errors) {
  const errorPercent = requests ? errors / requests * 100 : 0;
  return formatAsDecimalString(errorPercent);
}

export function formatAsDecimalString(number, numberOfDecimals = 3) {
  return number.toLocaleString(undefined, {
    maximumFractionDigits: numberOfDecimals,
    minimumFractionDigits: numberOfDecimals
  });
}

/**
 * Utility function to generate a URL safe string by replacing spaces with underscores.
 * Since we are using underscores we must first replace any existing ones with a `~` character.
 * @export
 * @param {string} param
 * @returns string
 */
export function encodeParameter(param) {
  return param.replace(/\s/gi, "·");
}

/**
 * Utility function to generate a human readable string by replacing underscores with spaces.
 * This is the anti-function of `encodeParameter` so we first replace underscores with a space
 * and if there is a `~` then we replace it with it's original undescore.
 * @export
 * @param {string} param
 * @returns string
 */
export function decodeParameter(param) {
  return param.replace(/·/gi, " ");
}
