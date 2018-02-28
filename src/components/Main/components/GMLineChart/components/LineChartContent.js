import styled from "styled-components";

import {
  BORDER_RADIUS_BASE,
  COLOR_CONTENT_BACKGROUND
} from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";

const LineChartContent = styled.div`
  flex: 1 1 100%;
  position: relative;
  display: flex;
  min-height: 250px;
  border-radius: ${BORDER_RADIUS_BASE};
  border: 1px solid ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.15).toString()};
  margin: ${spacingScale(1)};

  > * {
    margin: ${spacingScale(1)};
  }
`;

export default LineChartContent;
