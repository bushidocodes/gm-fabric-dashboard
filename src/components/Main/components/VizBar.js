import styled from "styled-components";

import { spacingScale, contrastColor } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

const VizBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: ${spacingScale(2)};
  border-radius: 1px 4px 4px 1px;
  height: 3px;
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.1).string()};
`;

export default VizBar;
