import { Effect, Actions } from "jumpstate";
import { reportError } from "../../notification";
import { fetchInstanceThreads } from "./apis";

/**
 * Action that fetches threads information (JVM) and stores in Redux
 * @param {string} [endpoint=getThreadsEndpoint()]
 * @returns
 */
function fetchAndStoreInstanceThreadsEffect(endpoint) {
  if (!endpoint) return;
  fetchInstanceThreads(endpoint)
    .then(json => Actions.fetchThreadsSuccess(json))
    .catch(err => Actions.fetchThreadsFailure(err));
}
Effect("fetchAndStoreInstanceThreads", fetchAndStoreInstanceThreadsEffect);

/**
 * Action that handles fetch thread errors, notifying the user via a popup and the console
 * @param {Object} err
 */
function fetchThreadsFailureEffect(err) {
  reportError("Fetching Threads Data failed.", false, err);
}
Effect("fetchThreadsFailure", fetchThreadsFailureEffect);
