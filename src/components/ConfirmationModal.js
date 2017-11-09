import React from "react";
import PropTypes from "prop-types";
import { spacingScale, contrastColor } from "style/styleFunctions";
import { COLOR_ALT_BACKGROUND, COLOR_DANGER } from "style/styleVariables";
import Modal from "react-modal";
import styled from "styled-components";

import Icon from "components/Icon";
import Glyph from "components/Glyphs";
import Button from "components/Button";

const modalBackgroundColor = COLOR_ALT_BACKGROUND;
const modalHeightBasis = "400px";
const modalWidthBasis = "500px";

// Add a media query to make left a calc below 600px;
const StyledModal = styled(Modal)`
  border-radius: 3px;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: ${spacingScale(3)};
  backdrop-filter: blur(10px);
  height: ${modalHeightBasis};
  top: 50vh;
  left: 50%;
  margin-top: -${parseInt(modalHeightBasis, 10) / 2}px;
  width: ${modalWidthBasis};
  transform: translateX(-50%) translateY(50px) scale(0.98);
  opacity: 0;
  background-color: ${modalBackgroundColor.fade(0.15).string()};
  color: ${contrastColor(modalBackgroundColor, 0.95).string()};
  transition: all 0.2s ease;

  > [class*="Content"] > * {
    transition: all 0.4s cubic-bezier(0.1, 0.5, 0.2, 1.3);
    transition: all 0.4s ease;
    position: relative;
    top: 0.5em;
  }

  [class*="after-open"] > & {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);

    > [class*="Content"] > * {
      top: 0;
    }
  }

  [class*="after-close"] > & {
    opacity: 0;
    transform: translateX(-50%) translateY(0) scale(0.5);

    > [class*="Content"] > * {
      top: 1em;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;

  > svg {
    margin-top: -${spacingScale(2)};
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 auto;
`;

const ConfirmationQuery = styled.h2`
  margin: 0;
  text-align: center;
`;
const SecondaryText = styled.p`
  margin: ${spacingScale(1)} 0 0;
  text-align: center;
`;

const CancelX = styled.span`
  width: ${spacingScale(3)};
  height: ${spacingScale(3)};
  cursor: pointer;
  position: absolute;
  top: ${spacingScale(2)};
  right: ${spacingScale(2)};
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    transform: scale(1.25);
    transition: all 0.1s ease;
  }

  &:active {
    transform: scale(1.1);
    transition: all 0;
  }
`;

function ConfirmationModal({
  question,
  secondary,
  isOpen,
  onConfirm,
  onCancel
}) {
  return (
    <StyledModal
      overlayClassName="modalOverlay"
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
    >
      <CancelX onClick={onCancel}>
        <Icon>
          <Glyph name="Close" />
        </Icon>
      </CancelX>
      <Content>
        <Icon
          backgroundStyle="BackgroundTriangleSmall"
          backgroundColor={COLOR_DANGER.fade(0.2).string()}
          glyphColor="white"
          iconRatio={6}
        >
          <Glyph name="Exclamation" />
        </Icon>
        <ConfirmationQuery>{question}</ConfirmationQuery>
        <SecondaryText>{secondary}</SecondaryText>
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
