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
