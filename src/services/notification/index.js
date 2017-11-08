import { notification } from "uikit";

export function reportError(errorLabel, shouldTimeout, errorObject = "") {
  notification(errorLabel, {
    status: "danger",
    timeout: shouldTimeout ? 5000 : 0
  });
  console.log(errorLabel, errorObject);
}
