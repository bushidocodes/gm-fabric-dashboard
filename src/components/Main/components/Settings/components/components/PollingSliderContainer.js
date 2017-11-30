import styled from "styled-components";

import { BORDER_RADIUS_BASE, COLOR_WHITE } from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";
import InputRange from "./InputRange";

const PollingSliderContainer = styled.div`
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid ${contrastColor(COLOR_WHITE, 0.1).toString()};
  border-radius: ${BORDER_RADIUS_BASE};
  padding: ${spacingScale(4)};
  margin-left: ${spacingScale(2)};
  ${InputRange};
`;

export default PollingSliderContainer;
