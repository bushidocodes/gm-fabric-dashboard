import styled from "styled-components";

import { FONT_SIZE_BASE } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const LineChartTitle = styled.h3`
  font-size: ${FONT_SIZE_BASE}; // LG
  font-weight: 600;
  margin: 0;
  padding: ${spacingScale(1)} ${spacingScale(1)} 0;
  flex: 1 0 ${spacingScale(5)};
  flex: 0 0 auto;
`;

export default LineChartTitle;
