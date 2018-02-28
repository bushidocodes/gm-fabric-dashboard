import styled from "styled-components";
import {
  COLOR_CONTENT_BACKGROUND,
  COLOR_CONTENT,
  PADDING_BASE,
  BORDER_RADIUS_BASE,
  ZINDEX_DROPDOWN
} from "style/styleVariables";

const LanguageSelectorContent = styled.ul`
  position: absolute;
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  border-radius: ${BORDER_RADIUS_BASE};
  color: ${COLOR_CONTENT.string()};
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
