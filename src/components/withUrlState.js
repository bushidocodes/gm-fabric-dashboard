import { withUrlState } from "with-url-state";
import history from "AppHistory";

export default function(Component, props = {}) {
  return withUrlState(history, props => props)(Component);
}
