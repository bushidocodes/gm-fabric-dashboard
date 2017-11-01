import {
  spacingScale,
  contrastColor
} from "../../../../../style/styleFunctions";
import {
  COLOR_ALT_BACKGROUND,
  COLOR_WHITE,
  COLOR_HIGHLIGHT
} from "../../../../../style/styleVariables";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TAB_WIDTH_BASE = "1%";
const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);
const COLOR_TAB_BACKGROUND_ACTIVE = contrastColor(COLOR_ALT_BACKGROUND, 0.3);
const COLOR_TAB_HIGHLIGHT = COLOR_HIGHLIGHT;

const TabLink = styled(NavLink).attrs({
  exact: true
})`
  flex: 1 1 ${TAB_WIDTH_BASE};
  background-color: ${COLOR_TAB_BACKGROUND_BASE.string()};
  border-top: 1px solid transparent;
  padding: ${spacingScale(0.5)} ${spacingScale(1)} ${spacingScale(1)};
  position: relative;
  font-weight: 600;
  transition: all .15s ease;
  margin: 1px 1px 0 0;

  &:after {
    color: inherit;
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 1px;
    border-radius: 1px;
    background-color: ${COLOR_TAB_HIGHLIGHT.string()};
    box-shadow: 0 0 1em 1px ${COLOR_TAB_HIGHLIGHT.string()};
    z-index: 100;
    pointer-events: none;
    opacity: 0;
  }

  &:hover {
    background-color: ${COLOR_TAB_BACKGROUND_BASE.mix(
      COLOR_TAB_BACKGROUND_ACTIVE,
      0.3
    ).string()};

    &:after {
      opacity: .5;
    }
  }

  &.active {
    background-color: ${COLOR_TAB_BACKGROUND_ACTIVE.string()};
    &:after {
      transition: .1s;
      opacity: 1;
      background-color: ${COLOR_TAB_HIGHLIGHT.mix(COLOR_WHITE, 0.3).string()};
    }
  }

  &:active {
    &:after {
      transition: .1s;
      opacity 1;
      background-color: ${COLOR_TAB_HIGHLIGHT.mix(COLOR_WHITE, 0.3).string()};
    }
  }
`;

export default TabLink;
