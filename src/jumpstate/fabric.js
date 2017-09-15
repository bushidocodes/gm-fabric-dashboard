import { State } from "jumpstate";

const fabric = State({
  initial: {
    groups: {}, //indexed by groupID
    services: {} //indexed by service ID
  },
  setGroups(state, groups) {
    return { ...state, groups };
  },
  fetchServicesSuccess(state, services) {
    return { ...state, services };
  }
});

export default fabric;
