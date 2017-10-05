import styled from "styled-components";
import {
  BORDER_RADIUS_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM
} from "../../style/styleVariables";
import { spacingScale } from "../../style/styleFunctions";

const BUTTON_COLOR_BASE = "#ffffff";
const BUTTON_COLOR_HOVER = "#fbfbfb";
const BUTTON_COLOR_ACTIVE = "#ececec";
const BUTTON_COLOR_HOVER_ACTIVE = "#dddddd";
const BUTTON_COLOR_ACTIVE_ACTIVE = "#D1D1D1";

export const StyledButton = styled.button`
  background-color: ${props =>
    props.selected ? BUTTON_COLOR_ACTIVE : BUTTON_COLOR_BASE};
  box-sizing: border-box;
  user-select: none;
  font-weight: 600;
  font-size: ${FONT_SIZE_BASE};
  border-radius: ${parseInt(BORDER_RADIUS_BASE - 1, 10)}px;
  line-height: 1.4;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  height: ${spacingScale(3.5)};
  border: 0px;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1),
    inset 0 -1px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0, 0, 0, 0.035);

  & + & {
    margin-left: ${spacingScale(0.5)};
  }

  &:hover {
    background-color: ${props =>
      props.selected ? BUTTON_COLOR_HOVER_ACTIVE : BUTTON_COLOR_HOVER};
    color: inherit;
  }

  &:active {
    background-color: ${props =>
      props.selected ? BUTTON_COLOR_ACTIVE_ACTIVE : BUTTON_COLOR_ACTIVE};
    color: inherit;
  }
`;

export const ButtonRoundedLeft = StyledButton.extend`
  border-top-left-radius: ${BORDER_RADIUS_BASE};
  border-bottom-left-radius: ${BORDER_RADIUS_BASE};
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export const ButtonRoundedRight = StyledButton.extend`
  border-top-right-radius: ${BORDER_RADIUS_BASE};
  border-bottom-right-radius: ${BORDER_RADIUS_BASE};
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export const ButtonSecondaryText = styled.span`
  margin-left: ${spacingScale(0.5)};
  opacity: 0.6;
  font-size: ${FONT_SIZE_SM};
`;
