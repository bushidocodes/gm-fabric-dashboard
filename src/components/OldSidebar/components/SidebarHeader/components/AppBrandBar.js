import styled from "styled-components";

import {
  FONT_SIZE_BASE,
  COLOR_ALT_BACKGROUND
} from "../../../../../style/styleVariables";
import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";

const APP_HEADER_HEIGHT = spacingScale(4.25);
const APP_HEADER_FONT_SIZE = FONT_SIZE_BASE;

const BRANDBAR_BACKGROUND_COLOR = COLOR_ALT_BACKGROUND.string();
const BRANDBAR_TEXT_COLOR = contrastColor(COLOR_ALT_BACKGROUND).string();

const AppBrandBar = styled.nav`
  background-color: ${BRANDBAR_BACKGROUND_COLOR};
  flex: 0 0 ${APP_HEADER_HEIGHT};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: ${spacingScale(0.5)};
  font-size: ${APP_HEADER_FONT_SIZE};
  color: ${BRANDBAR_TEXT_COLOR};
`;

export default AppBrandBar;
