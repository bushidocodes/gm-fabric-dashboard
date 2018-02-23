import styled from "styled-components";
import {
  COLOR_WHITE,
  COLOR_BLACK,
  PADDING_BASE,
  BORDER_RADIUS_BASE,
  FONT_WEIGHT_SEMIBOLD,
  ZINDEX_DROPDOWN
} from "style/styleVariables";

const LanguageSelectorContent = styled.ul`
  position: absolute;
  background-color: ${COLOR_WHITE.string()};
  border-radius: ${BORDER_RADIUS_BASE};
  color: ${COLOR_BLACK.string()};
  font-weight: ${FONT_WEIGHT_SEMIBOLD};
  opacity: 0;
  padding: ${PADDING_BASE};
  margin: 0;
  text-align: right;
  transition: all 0.5s ease;
  visibility: hidden;
  white-space: normal;
  flex: 1 1 10em;
  display: flex;
  flex-direction: column;
  right: 0;

  ${props =>
    props.visible &&
    `
      opacity: 1;
      z-index: ${ZINDEX_DROPDOWN};
      visibility: visible;`};
`;

export default LanguageSelectorContent;
