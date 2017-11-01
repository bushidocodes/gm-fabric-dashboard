import styled from "styled-components";

import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";
import { COLOR_ALT_BACKGROUND } from "../../../../../style/styleVariables";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabGraph = styled.div`
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 0.8).string()};
  margin: 0 ${spacingScale(0.25)};
  height: ${spacingScale(3)};
`;

export default TabGraph;
