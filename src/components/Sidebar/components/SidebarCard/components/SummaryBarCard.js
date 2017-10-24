import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { spacingScale } from "../../../../../style/styleFunctions";
import {
  COLOR_SIDEBAR_BACKGROUND,
  COLOR_WHITE,
  COLOR_GREEN
} from "../../../../../style/styleVariables";

const SIDEBAR_BACKGROUND = COLOR_SIDEBAR_BACKGROUND.string();
const SIDEBAR_ACTIVE_BACKGROUND = COLOR_SIDEBAR_BACKGROUND.mix(
  COLOR_WHITE,
  0.2
).string();
const SIDEBAR_ACTIVE_BOXSHADOW = COLOR_GREEN.string();
const SIDEBAR_ACTIVE_TEXTSHADOW = SIDEBAR_ACTIVE_BACKGROUND;
const SIDEBAR_HOVER_BACKGROUND = COLOR_SIDEBAR_BACKGROUND.mix(
  COLOR_WHITE,
  0.08
).string();
const SIDEBAR_HOVER_TEXTSHADOW = SIDEBAR_HOVER_BACKGROUND;

//extend RR's NavLink and add active styling
export const SummaryBarCard = styled(NavLink).attrs({
  activeStyle: {
    backgroundColor: SIDEBAR_ACTIVE_BACKGROUND,
    boxShadow: `inset 1px 0 ${SIDEBAR_ACTIVE_BOXSHADOW}`,
    textShadow: `1px 1px ${SIDEBAR_ACTIVE_TEXTSHADOW}`,
    cursor: "default"
  }
})`
  flex: 0 0 ${spacingScale(5)};
  display: flex;
  flex-direction: column;
  background-color: ${SIDEBAR_BACKGROUND};
  text-shadow: 1px 1px ${SIDEBAR_BACKGROUND}};
  padding: 0;
  transition: all 0.15s ease;
  &:hover {
    background-color: ${SIDEBAR_HOVER_BACKGROUND};
    text-shadow: 1px 1px
    ${SIDEBAR_HOVER_TEXTSHADOW};
  }
`;

export default SummaryBarCard;
