import { spacingScale } from "style/styleFunctions";

import TableCol from "./TableCol";

const SparklineCol = TableCol.extend`
  height: ${spacingScale(3)};
  padding-top: ${spacingScale(0.5)};
  padding-bottom: ${spacingScale(0.5)};

  svg {
    height: inherit;
  }
`;

export default SparklineCol;
