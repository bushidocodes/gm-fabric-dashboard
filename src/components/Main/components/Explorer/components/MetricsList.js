import styled from "styled-components";

import { edgeColor, spacingScale } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

const MetricsList = styled.div`
  flex: 0 0 300px;
  border-right: 1px solid ${edgeColor(COLOR_CONTENT_BACKGROUND).string()};
  position: relative;
  margin-bottom: ${spacingScale(2)};
  @media all and (min-width: 1200px) {
    flex: 0 0 40%;
    max-width: 550px;
    margin-right: ${spacingScale(2)};
    margin-bottom: 0;
  }
`;

export default MetricsList;
