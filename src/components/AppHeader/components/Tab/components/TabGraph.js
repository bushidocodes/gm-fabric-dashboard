import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import { COLOR_ALT_BACKGROUND, BORDER_RADIUS_BASE } from "style/styleVariables";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabGraph = styled.div`
  height: ${spacingScale(3)};
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 1).string()};
  margin: auto ${spacingScale(0.5)} 0;

  > * {
    width: 100%;
    height: 100%;
  }

  svg {
    border-radius: ${BORDER_RADIUS_BASE};
    background-color: rgba(144, 144, 144, 0.1);
  }
`;

export default TabGraph;
