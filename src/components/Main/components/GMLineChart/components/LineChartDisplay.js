import styled from "styled-components";

import { CHART_BACKGROUND_COLOR, FONT_STACK_DATA } from "style/styleVariables";
import { chartHeight } from "style/styleFunctions";

const LineChartDisplay = styled.div`
  font-family: ${FONT_STACK_DATA};
  background-color: ${CHART_BACKGROUND_COLOR};
  width: 100%;
  height: 100%;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid transparent;
  height: ${props => (props.height ? chartHeight(props.height) : "100%")};
`;

export default LineChartDisplay;
