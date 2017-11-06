import { State } from "jumpstate";
import "services/fabricMicroservices";

const fabric = State({
  initial: {
    fabricPollingInterval: 5000,
    isPollingFabric: false,
    selectedInstance: null,
    servicesPollingFailures: 0,
    selectedService: null,
    selectedServiceVersion: null,
    services: {} //indexed by service ID
  },
  setFabricPollingInterval(state, payload) {
    return { ...state, fabricPollingInterval: payload };
  },
  setIsPollingFabric(state, payload) {
    return { ...state, isPollingFabric: payload };
  },
  setSelectedInstance(state, payload) {
    return { ...state, selectedInstance: payload };
  },
  setServicesPollingFailures(state, payload) {
    return { ...state, servicesPollingFailures: payload };
  },
  setSelectedService(state, payload) {
    return { ...state, selectedService: payload };
  },
  setSelectedServiceVersion(state, payload) {
    return { ...state, selectedServiceVersion: payload };
  },
  setFabricMicroservices(state, services) {
    return { ...state, services };
  }
});

export default fabric;
