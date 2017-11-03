import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  FONT_SIZE_SM,
  APP_FOOTER_HEIGHT,
  ZINDEX_STICKY
} from "style/styleVariables";

const Footer = styled.footer`
  user-select: none;
  overflow: hidden;
  padding: ${spacingScale(0.5)};
  display: flex;
  flex-direction: row;
  color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.8).string()};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  font-size: ${FONT_SIZE_SM};
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${APP_FOOTER_HEIGHT};
  z-index: ${ZINDEX_STICKY};

  & + * {
    padding-bottom: ${spacingScale(4)};
  }
`;

export default Footer;
