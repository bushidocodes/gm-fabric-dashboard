import {
  spacingScale,
  contrastColor
} from "../../../../../style/styleFunctions";
import {
  COLOR_ALT_BACKGROUND,
  FONT_SIZE_LG
} from "../../../../../style/styleVariables";
import styled from "styled-components";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabTitle = styled.h1`
  font-size: ${FONT_SIZE_LG};
  margin: ${spacingScale(0.5)} ${spacingScale(2)} 0;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 1).string()};
  white-space: nowrap;
  font-weight: 600;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

export default TabTitle;
