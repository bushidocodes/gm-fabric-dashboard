import styled from "styled-components";

import {
  COLOR_HIGHLIGHT,
  COLOR_CONTENT_BACKGROUND,
  FONT_SIZE_SM,
  FONT_STACK_DATA,
  BORDER_RADIUS_BASE,
  FONT_SIZE_HERO,
  FONT_STACK_BASE
} from "../style/styleVariables";

import { contrastColor, spacingScale } from "../style/styleFunctions";

export const ReadoutDashboard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  orphans: 2;
`;

export const ReadoutContainer = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  flex: 1 0 300px;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: ${props => (props.primary ? 0 : spacingScale(0.5))};
  background-color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0.8).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0.1).string()};
  color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 1).string()};
  font-family: ${FONT_STACK_BASE};
`;

export const ReadoutItem = styled.div`
  flex: 0 1 100%;
  min-height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${spacingScale(1)} ${spacingScale(0.5)};

  & + &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-top: 1px solid currentColor;
    opacity: 0.125;
  }
`;

export const ReadoutItemData = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${spacingScale(1)} 0;

  &:first-child {
    padding-left: ${spacingScale(2)};
  }
`;

export const ReadoutItemTitle = styled.h2`
  font-size: ${FONT_SIZE_SM};
  font-family: ${FONT_STACK_DATA};
  margin: 0;
  font-weight: 500;
  min-height: 1em;
`;

export const ReadoutItemValue = styled.span`
  font-size: ${FONT_SIZE_HERO};
  word-break: break-all;
  min-height: 1em;
`;

export const ReadoutItemDetail = styled.span`
  font-size: ${FONT_SIZE_SM};
  font-weight: 600;
  min-height: 1em;
`;

export const ReadoutItemIcon = styled.div`
  flex: 0 0 ${spacingScale(10)};
  height: ${spacingScale(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
