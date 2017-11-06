import { State } from "jumpstate";

const dashboards = State({
  initial: {},
  setDashboards(state, dashboards) {
    return dashboards;
  }
});

export default dashboards;
