import { State } from "jumpstate";

const fabric = State({
  initial: {
    services: {} //indexed by service ID
  },
  setServices(state, services) {
    return { ...state, services };
  }
});

export default fabric;
