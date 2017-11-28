import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const LineChartContent = styled.div`
  flex: 1 1 100%;
  min-height: 250px;
  position: relative;

  > * {
    margin: ${spacingScale(1)};
  }
`;

export default LineChartContent;
