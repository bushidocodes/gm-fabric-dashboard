import styled from "styled-components";

import { spacingScale, contrastColor } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

const VizBar = styled.div`
  border-bottom: 1px dashed
    ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.1).string()};
  border-radius: 2px;
  bottom: 0;
  height: 1px;
  left: ${spacingScale(2)};
  position: absolute;
  right: ${spacingScale(2)};
`;

export default VizBar;
