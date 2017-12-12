import React from "react";
import PropTypes from "prop-types";
import { COLOR_DANGER } from "style/styleVariables";

import Actions from "./components/Actions";
import CancelX from "./components/CancelX";
import Content from "./components/Content";
import ConfirmationQuery from "./components/ConfirmationQuery";
import SecondaryText from "./components/SecondaryText";
import StyledModal from "./components/StyledModal";

import Icon from "components/Icon";
import Glyph from "components/Glyphs";
import Button from "components/Button";

function ConfirmationModal({
  question,
  secondary,
  isOpen,
  onConfirm,
  onCancel
}) {
  // The line below is necessary to designate a app element which will be given aria-visible false when modal is up so screen readers only focus on modal content
  const rootAppElement = document.querySelectorAll("#root")[0];
  return (
    <StyledModal
      isOpen={isOpen}
      aria={{
        labelledby: "question",
        describedby: "secondaryText"
      }}
      appElement={rootAppElement}
      overlayClassName="modalOverlay"
      shouldCloseOnOverlayClick={true}
    >
      <CancelX onClick={onCancel}>
        <Icon>
          <Glyph name="Close" />
        </Icon>
      </CancelX>
      <Content>
        <Icon
          backgroundColor={COLOR_DANGER.fade(0.2).string()}
          backgroundStyle="BackgroundTriangleSmall"
          glyphColor="white"
          iconRatio={6}
        >
          <Glyph name="Exclamation" />
        </Icon>
        <ConfirmationQuery id="question">{question}</ConfirmationQuery>
        <SecondaryText id="secondaryText">{secondary}</SecondaryText>
      </Content>
      <Actions>
        <Button clickAction={onCancel} label="Cancel" />
        <Button type="danger" clickAction={onConfirm} label="Confirm" />
      </Actions>
    </StyledModal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};

export default ConfirmationModal;
