import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { spacingScale } from "../style/styleFunctions";
import {
  COLOR_SIDEBAR_BACKGROUND,
  COLOR_SIDEBAR_CONTENT,
  COLOR_WHITE,
  COLOR_GREEN,
  FONT_WEIGHT_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM,
  FONT_STACK_DATA,
  PADDING_BASE
} from "../style/styleVariables";

const SIDEBAR_BACKGROUND = COLOR_SIDEBAR_BACKGROUND.string();
const SIDEBAR_TEXT = COLOR_SIDEBAR_CONTENT.string();
const SIDEBAR_FADED_TEXT = COLOR_SIDEBAR_CONTENT.fade(0.4).string();
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
const SIDEBAR_BORDER = COLOR_SIDEBAR_BACKGROUND.mix(COLOR_WHITE, 0.1).string();

export const SummaryBar = styled.div`
  flex: 1 1 100%;
  transition: all 0.15s ease;
  user-select: none;
`;

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

export const SummaryBarCardTitle = styled.div`
  color: ${SIDEBAR_TEXT};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${spacingScale(1)} ${spacingScale(0.5)};
  border-top: 1px solid ${SIDEBAR_BORDER};
  position: relative;
  > * {
    flex: 0 0 ${spacingScale(3)};
  }
`;

export const SummaryBarCardIcon = styled.span.attrs({
  "data-uk-icon": props => `icon: ${props.icon || "grid"}; ratio: 1`
})`
  margin-right: ${spacingScale(0.5)} !important;
  position: relative;
  left: 2px;
`;

export const SummaryBarCardHeading = styled.h1`
  font-size: ${FONT_SIZE_BASE};
  font-weight: ${FONT_WEIGHT_BASE + 100};
  margin: 0.2em 0 0;
  flex: 1 1 100%;
  align-self: stretch;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  color: ${SIDEBAR_TEXT};
`;

export const SummaryBarCardBody = styled.div`
  padding: 0 0;
  margin-top: -${spacingScale(0.25)};
  color: ${SIDEBAR_TEXT}};
  transition: all 0.15s ease;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  ${props => (props.open ? "max-height: 100vh; opacity: 1;" : "")};
  > *:last-child {
    margin-bottom: ${PADDING_BASE};
  }
`;

export const SummaryBarCardKVWrap = styled.div`
  display: flex;
  padding: 0 ${spacingScale(1)};
  font-family: ${FONT_STACK_DATA};
  position: relative;
  &:last-child {
    margin-bottom: ${spacingScale(1)};
  }
`;

// base styles for key and value elements
export const SummaryBarCardKV = styled.dd`
  font-size: ${FONT_SIZE_SM};
  font-weight: 500;
  flex: 1 1;
  padding: ${spacingScale(0.25)};
`;

export const SummaryBarCardKVKey = SummaryBarCardKV.withComponent("dt").extend`
  color: ${SIDEBAR_FADED_TEXT};
  flex-basis: 40%;
  text-align: left;
  padding-left: 24px;
`;

export const SummaryBarCardKVValue = SummaryBarCardKV.extend`
  flex-basis: 60%;
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
  position: relative;
`;

export const ValueText = styled.span`
  flex: 0 0 auto;
  position: relative;
  z-index: 2;
`;

export const SparkLineContainer = styled.div`
  flex: 1 1 100px;
  overflow: hidden;
  opacity: 0.5;
  > svg {
    position: absolute;
    right: 0;
    height: 20px;
    width: 120px;
    top: 0;
  }
`;

export const ButtonDetails = styled.button`
  background-color: transparent;
  border-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  color: white;
  padding: 0;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  > span > svg {
    ${props => (props.open ? "transform: rotate(-90deg);" : "")};
    transition: transform 0.05s ease;
  }
`;
