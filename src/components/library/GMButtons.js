import styled from "styled-components";
import {
  BORDER_RADIUS_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM
} from "../../style/styleVariables";
import { spacingScale } from "../../style/styleFunctions";

export const StyledButton = styled.button`
  background-color: ${props => (props.selected ? "lightgray" : "white")};
  box-sizing: border-box;
  user-select: none;
  font-weight: 600;
  font-size: ${FONT_SIZE_BASE};
  border-radius: ${BORDER_RADIUS_BASE};
  border-width: 1px;
  line-height: 1.4;
  border-style: solid;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  & + & {
    margin-left: ${spacingScale(0.5)};
  }
`;

export const ButtonRoundedLeft = StyledButton.extend`
  border: 1px solid;
  border-color: #d6d7db;
  border-top-left-radius: ${BORDER_RADIUS_BASE};
  border-bottom-left-radius: ${BORDER_RADIUS_BASE};
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export const ButtonRoundedRight = StyledButton.extend`
  border: 1px solid;
  border-color: #d6d7db;
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

export const ButtonGroup = styled.div``;
