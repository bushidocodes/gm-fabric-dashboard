import { createSelector } from "reselect";

const getCurrentThreads = state => state.threadsTable;
const getThreadsFilter = state => state.settings.threadsFilter;

/**
 * Filter the current threads according to store.settings.threadsFilter in the
 * Redux store.
 */
export const getVisibleThreads = createSelector(
  [getCurrentThreads, getThreadsFilter],
  (threadsTable, threadsFilter) => {
    switch (threadsFilter) {
      case "active":
        return threadsTable.filter(
          threadItem => threadItem.state === "RUNNABLE"
        );
      case "idle":
        return threadsTable.filter(
          threadItem =>
            threadItem.state === "WAITING" ||
            threadItem.state === "TIMED_WAITING"
        );
      case "stopped":
        return threadsTable.filter(
          threadItem =>
            threadItem.state === "TERMINATED" ||
            threadItem.state === "BLOCKED" ||
            threadItem.state === "NEW"
        );
      case "all":
      default:
        return threadsTable;
    }
  }
);

/**
 * Count the current threads according to the state and provide an object containing
 * these totals.
 */
export const getThreadCounts = createSelector(
  getCurrentThreads,
  (threadsTable = []) => {
    return {
      active: threadsTable
        ? threadsTable.filter(threadItem => threadItem.state === "RUNNABLE")
            .length
        : 0,
      idle: threadsTable
        ? threadsTable.filter(
            threadItem =>
              threadItem.state === "WAITING" ||
              threadItem.state === "TIMED_WAITING"
          ).length
        : 0,
      stopped: threadsTable
        ? threadsTable.filter(
            threadItem =>
              threadItem.state === "TERMINATED" ||
              threadItem.state === "BLOCKED" ||
              threadItem.state === "NEW"
          ).length
        : 0,
      all: threadsTable.length
    };
  }
);
