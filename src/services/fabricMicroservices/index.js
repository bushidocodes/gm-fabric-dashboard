import { Effect } from "jumpstate";
import {
  fetchFabricMicroservicesFailureEffect,
  fetchAndStoreFabricMicroservicesEffect,
  fetchFabricMicroservicesSuccessEffect,
  changeFabricMicroservicesPollingIntervalEffect,
  startPollingFabricMicroservicesEffect,
  stopPollingFabricMicroservicesEffect,
  selectInstanceEffect
} from "./fabricMicroservices";

Effect(
  "fetchFabricMicroservicesFailure",
  fetchFabricMicroservicesFailureEffect
);

Effect(
  "fetchAndStoreFabricMicroservices",
  fetchAndStoreFabricMicroservicesEffect
);

Effect(
  "fetchFabricMicroservicesSuccess",
  fetchFabricMicroservicesSuccessEffect
);

Effect(
  "changeFabricMicroservicesPollingInterval",
  changeFabricMicroservicesPollingIntervalEffect
);

Effect(
  "startPollingFabricMicroservices",
  startPollingFabricMicroservicesEffect
);

Effect("stopPollingFabricMicroservices", stopPollingFabricMicroservicesEffect);

Effect("selectInstance", selectInstanceEffect);
