import React from "react";

import Icon from "components/Icon";
import Close from "components/Glyphs/Close";

import DismissButtonContainer from "./components/DismissButtonContainer";

function DismissButton() {
  return (
    <DismissButtonContainer>
      <Icon>
        <Close />
      </Icon>
    </DismissButtonContainer>
  );
}

export default DismissButton;
