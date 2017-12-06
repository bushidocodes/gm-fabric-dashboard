import styled from "styled-components";

import { CHART_BACKGROUND_COLOR, FONT_STACK_DATA } from "style/styleVariables";
import { chartHeight } from "style/styleFunctions";

const LineChartDisplay = styled.div`
  font-family: ${FONT_STACK_DATA};
  background-color: ${CHART_BACKGROUND_COLOR};
  ${props => (props.height ? chartHeight(props.height) : "height:  100%")};
  width: 100%;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid transparent;
`;

export default LineChartDisplay;
