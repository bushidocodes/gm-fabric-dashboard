import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import {
  FONT_SIZE_BASE,
  FONT_STACK_BASE,
  COLOR_ALT_BACKGROUND
} from "style/styleVariables";

const APP_TOOLBAR_HEIGHT = spacingScale(4.25);
const APP_TOOLBAR_FONT_SIZE = FONT_SIZE_BASE;
const APP_TOOLBAR_BACKGROUND_COLOR = COLOR_ALT_BACKGROUND.string();
const APP_TOOLBAR_TEXT_COLOR = contrastColor(COLOR_ALT_BACKGROUND).string();

const AppToolBarHeader = styled.nav`
  display: flex;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  background-color: ${APP_TOOLBAR_BACKGROUND_COLOR};
  flex: 0 0 ${APP_TOOLBAR_HEIGHT};
  font-size: ${APP_TOOLBAR_FONT_SIZE};
  color: ${APP_TOOLBAR_TEXT_COLOR};
  font-family: ${FONT_STACK_BASE};
`;

export default AppToolBarHeader;
