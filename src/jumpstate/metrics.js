import { State } from "jumpstate";

// State Objects
const metrics = State({
  initial: {},
  fetchMetricsSuccess(state, payload) {
    const result = { ...state };
    const timestamp = Date.now() + "";
    Object.keys(payload).forEach(metric => {
      result[metric] = { ...state[metric], [timestamp]: payload[metric] };
    });
    // Deep merge the new snapshot into the existing state object.
    return result;
  },
  clearMetrics(state, payload) {
    return {};
  }
});

export default metrics;
