import { State } from "jumpstate";

import { getFabricServer } from "utils/head";

// Initial state is determined by whether a fabric server has been configured or
// not. If the server has been configured, then metricsEndpoint, threadsEndpoint,
// and runtime are set to null and will be later set by the response from the
// fabric server. If the server has not been configured, the values are assumed
// to be statically configured in the index.html head and populated immediately.
const settings = State({
  initial: {
    fabricServer: getFabricServer(),
    threadsFilter: "all"
  },

  setThreadsFilter(state, payload) {
    return { ...state, threadsFilter: payload };
  }
});

export default settings;
