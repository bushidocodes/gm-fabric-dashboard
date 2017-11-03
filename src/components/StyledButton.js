// NPM Modules
import styled from "styled-components";
import Color from "color";

// External Dependencies
import {
  BORDER_RADIUS_BASE,
  FONT_SIZE_BASE,
  COLOR_HIGHLIGHT
} from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";

const BUTTON_COLOR_BASE = "#ffffff";
const BUTTON_COLOR_HOVER = "#fbfbfb";
const BUTTON_COLOR_ACTIVE = "#ececec";
const BUTTON_COLOR_HOVER_ACTIVE = "#dddddd";
const BUTTON_COLOR_ACTIVE_ACTIVE = "#D1D1D1";
const BUTTON_COLOR_SELECTED = COLOR_HIGHLIGHT;

const StyledButton = styled.button`
  background-color: ${props =>
    props.selected ? BUTTON_COLOR_ACTIVE : BUTTON_COLOR_BASE};
  box-sizing: border-box;
  user-select: none;
  font-weight: 600;
  font-size: ${FONT_SIZE_BASE};
  border-radius: ${parseInt(BORDER_RADIUS_BASE, 10) - 1}px;
  line-height: 1.4;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
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

  &:focus,
  &:active {
    background-color: ${props =>
      props.selected ? BUTTON_COLOR_ACTIVE_ACTIVE : BUTTON_COLOR_ACTIVE};
    color: inherit;
    outline: 0;
  }
  ${props =>
    props.selected &&
    `
      &,
      &:hover,
      &:active {

        cursor: default;
        background-color: ${BUTTON_COLOR_SELECTED};
        color: ${contrastColor(BUTTON_COLOR_SELECTED, 1)};
      }
      &:focus {
        cursor: default;
        background-color: ${Color(BUTTON_COLOR_SELECTED)
          .darken(0.2)
          .hsl()
          .string()};
        color: ${contrastColor(BUTTON_COLOR_SELECTED, 1)};
      }
    `};

  > svg {
    margin-top: -2px;
    margin-bottom: -2px;
  }
`;

export default StyledButton;
