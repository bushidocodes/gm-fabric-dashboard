import { notification } from "uikit";

export function reportError(errorLabel, shouldTimeout, errorObject = "") {
  notification(errorLabel, {
    status: "danger",
    timeout: shouldTimeout ? 5000 : 86400000
  });
  console.log(errorLabel, errorObject);
}
