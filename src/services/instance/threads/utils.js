import { getState } from "jumpstate";
import { getFabricServer } from "utils/head";

export function buildDiscoveryServiceInstanceThreadsEndpoint(
  fabricServer = getState().settings.fabricServer || getFabricServer(),
  service = getState().fabric.selectedService || "",
  version = getState().fabric.selectedServiceVersion || "",
  instanceID = getState().fabric.instanceID
) {
  return `${fabricServer}/${service}/${version}/${instanceID}`;
}
