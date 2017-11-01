import styled from "styled-components";
import {
  COLOR_ALT_BACKGROUND,
  FONT_SIZE_SM
} from "../../../../../style/styleVariables";
import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabDetails = styled.dl`
  margin: 0 ${spacingScale(2)} ${spacingScale(0.5)};
  font-size: ${FONT_SIZE_SM};
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 1).string()};
`;

export default TabDetails;
