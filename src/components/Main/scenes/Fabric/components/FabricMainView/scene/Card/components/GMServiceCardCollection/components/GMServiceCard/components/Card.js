import {
  BORDER_RADIUS_BASE,
  PADDING_BASE,
  FONT_SIZE_SM
} from "../../../../../../../../../../../../../style/styleVariables";

import Color from "color";
import styled from "styled-components";

export const CardContainer = styled.div`
  color: ${props => props.cardFontColor};
  background: linear-gradient(
    ${props => Color(props.cardBackgroundColor).string()},
    ${props =>
      Color(props.cardBackgroundColor)
        .hsl()
        .rotate(-7)
        .string()}
  );
  border: 1px solid ${props => props.cardBorderColor};
  border-bottom-color: ${props => props.cardBorderBottomColor};
  border-radius: ${BORDER_RADIUS_BASE};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${parseInt(PADDING_BASE, 10) / 2}px;
  padding: ${parseInt(PADDING_BASE, 10) * 1.5}px
    ${parseInt(PADDING_BASE, 10) * 1.5}px ${parseInt(PADDING_BASE, 10)}px;
  font-size: ${FONT_SIZE_SM};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: ${parseInt(props => props.cardFontWeight, 10) + 500};
  justify-content: space-between;
`;
