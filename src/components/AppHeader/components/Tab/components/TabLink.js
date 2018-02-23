import { NavLink } from "react-router-dom";
import styled from "styled-components";

import TabTitle from "./TabTitle";
import TabDetails from "./TabDetails";
import TabKey from "./TabKey";

import { spacingScale } from "style/styleFunctions";
import {
  COLOR_HIGHLIGHT,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_SEMIBOLD,
  BORDER_RADIUS_BASE
} from "style/styleVariables";

const TAB_WIDTH_BASE = "1%";
const COLOR_TAB_HIGHLIGHT = COLOR_HIGHLIGHT.lighten(0.1);

// Note: Edge requires the overflow: hidden property to maintian
// equal sized cards. flex-basis is not sufficient!
const TabLink = styled(NavLink).attrs({
  exact: true
})`
  font-weight: ${FONT_WEIGHT_REGULAR};
  flex: 1 1 ${TAB_WIDTH_BASE};
  margin: 2px;
  overflow: hidden;
  padding: ${spacingScale(0.5)} 0 ${spacingScale(0)};
  position: relative;
  transition: all 0.15s ease;
  background-color: #333;
  border-radius: ${BORDER_RADIUS_BASE};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: 4px;
    border: 2px solid ${COLOR_HIGHLIGHT.string()};
    opacity: 0;
  }

  &.active,
  &.active:hover {
    background-color: #000;

    &:after {
      opacity: 1;
    }
  }

  &:focus,
  &:hover {
    background-color: #222;
  }
`;

export default TabLink;
