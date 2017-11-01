import styled from "styled-components";

import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "../../../../../style/styleVariables";

const MetricsList = styled.div`
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()};
  flex: 0 0 300px;
  position: relative;
  margin-bottom: ${spacingScale(2)};
  @media all and (min-width: 1200px) {
    flex: 0 0 40%;
    margin-right: ${spacingScale(2)};
    margin-bottom: 0;
  }
`;

export default MetricsList;
