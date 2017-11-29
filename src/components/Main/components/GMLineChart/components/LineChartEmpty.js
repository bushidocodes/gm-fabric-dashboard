import styled from "styled-components";

import {
  CHART_BACKGROUND_COLOR,
  FONT_SIZE_LG,
  COLOR_WARNING,
  COLOR_CONTENT_MUTED
} from "style/styleVariables";
import { spacingScale, edgeColor, contrastColor } from "style/styleFunctions";

const LineChartEmpty = styled.div`
  padding: ${spacingScale(1)};
  flex: 1 0 auto;

  h1,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  h1 {
    color: ${contrastColor(CHART_BACKGROUND_COLOR, "100%", COLOR_WARNING)};
    font-weight: bold;
    font-size: ${FONT_SIZE_LG};
    padding-bottom: ${spacingScale(2)};
    margin-bottom: ${spacingScale(2)};
    border-bottom: 1px solid ${edgeColor(CHART_BACKGROUND_COLOR)};
  }

  p,
  ul {
    color: ${COLOR_CONTENT_MUTED};
  }

  ul {
    padding-left: ${spacingScale(2)};
    list-style: circle;
  }
`;

export default LineChartEmpty;
