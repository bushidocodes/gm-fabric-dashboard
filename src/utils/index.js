const INSTANCE_ID_LENGTH = 8;

export const trimID = id => {
  if (!id) return "";
  const strID = String(id);
  return strID.slice(strID.length - INSTANCE_ID_LENGTH);
};

/**
 * Clears the interval with the ID stored at window.refreshMetricsIntervalID and then 
 * wipes window.refreshMetricsIntervalID
 */
export function clearIntervalIfNeeded() {
  if (window.refreshMetricsIntervalID) {
    clearInterval(window.refreshMetricsIntervalID);
    window.refreshMetricsIntervalID = null;
  }
}
