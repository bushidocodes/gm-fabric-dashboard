import { spacingScale, contrastColor } from "style/styleFunctions";
import {
  BORDER_RADIUS_BASE,
  COLOR_CONTENT_BACKGROUND
} from "style/styleVariables";

import TableCol from "./TableCol";

const SparklineCol = TableCol.extend`
  padding: 0;
  height: ${spacingScale(3)};
  position: relative;
  display: flex;

  svg {
    flex: 1 1 100%;
    border-radius: ${BORDER_RADIUS_BASE};
    background-color: rgba(144, 144, 144, 0.1);
  }
`;

export default SparklineCol;
