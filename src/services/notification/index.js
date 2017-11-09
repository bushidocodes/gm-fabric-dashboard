export function reportError(errorLabel, shouldTimeout, errorObject = "") {
  window.addNotification({
    level: "error",
    position: "tc",
    message: errorLabel,
    autoDismiss: shouldTimeout ? 5 : 0,
    title: "Error"
  });
  console.log(errorLabel, errorObject);
}
