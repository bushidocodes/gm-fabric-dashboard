import styled from "styled-components";

import { BORDER_RADIUS_BASE, COLOR_WHITE } from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";
import InputRange from "./InputRange";

const PollingSliderContainer = styled.div`
  align-items: center;
  border: 1px solid ${contrastColor(COLOR_WHITE, 0.1).toString()};
  border-radius: ${BORDER_RADIUS_BASE};
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;
  justify-content: center;
  margin-left: ${spacingScale(2)};
  padding: ${spacingScale(4)};
  position: relative;
  ${InputRange};
`;

export default PollingSliderContainer;
