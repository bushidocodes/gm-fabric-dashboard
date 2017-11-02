import { PADDING_BASE, FONT_SIZE_SM } from "style/styleVariables";

import Color from "color";
import styled from "styled-components";

const CARD_SPACING = PADDING_BASE;

export const CardContainer = styled.div`
  color: ${props => props.cardFontColor};
  background-color: ${props => Color(props.cardBackgroundColor).string()};
  border: 1px solid ${props => props.cardBorderColor};
  border-top: 2px solid ${props => props.cardBorderAltColor};
  width: 100%;
  border-radius: 1px;
  height: ${props => props.height};
  margin: ${parseInt(CARD_SPACING, 10) / 2}px;
  padding: ${parseInt(PADDING_BASE, 10) * 1.5}px
    ${parseInt(PADDING_BASE, 10) * 1.5}px ${parseInt(PADDING_BASE, 10)}px;
  font-size: ${FONT_SIZE_SM};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media all and (min-width: 375px) {
    width: calc((100% / 2) - ${CARD_SPACING});
  }
  @media all and (min-width: 530px) {
    width: calc((100% / 3) - ${CARD_SPACING});
  }
  @media all and (min-width: 704px) {
    width: calc((100% / 4) - ${CARD_SPACING});
  }
  @media all and (min-width: 875px) {
    width: calc((100% / 5) - ${CARD_SPACING});
  }
  @media all and (min-width: 1040px) {
    width: calc((100% / 6) - ${CARD_SPACING});
  }
  @media all and (min-width: 1208px) {
    width: calc((100% / 7) - ${CARD_SPACING});
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: ${parseInt(props => props.cardFontWeight, 10) + 500};
  justify-content: space-between;
  z-index: 10;
  pointer-events: none;
  letter-spacing: 0.03em;
`;
