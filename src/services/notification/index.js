import React from "react";

import ExtrasContainer from "components/Notification/components/ExtrasContainer";
import MessageIcon from "components/Notification/components/MessageIcon";
import DismissButton from "components/Notification/components/DismissButton";

export function reportError(errorLabel, shouldTimeout, errorObject = "") {
  window.addNotification({
    level: "error",
    position: "tc",
    message: errorLabel,
    autoDismiss: shouldTimeout ? 5 : 0,
    title: "Error",
    children: (
      <ExtrasContainer>
        <MessageIcon level={"error"} />
        <DismissButton />
      </ExtrasContainer>
    )
  });
  console.log(errorLabel, errorObject);
}

export default reportError;
