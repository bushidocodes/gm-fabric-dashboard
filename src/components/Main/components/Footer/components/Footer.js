import styled from "styled-components";
import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  FONT_SIZE_SM
} from "../../../../../style/styleVariables";

const Footer = styled.footer`
  user-select: none;
  overflow: hidden;
  padding: ${spacingScale(0.5)};
  display: flex;
  flex-direction: row;
  color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.8)};
  font-size: ${FONT_SIZE_SM};
  align-items: center;
  flex: 0 0 ${spacingScale(4)};
`;

export default Footer;
