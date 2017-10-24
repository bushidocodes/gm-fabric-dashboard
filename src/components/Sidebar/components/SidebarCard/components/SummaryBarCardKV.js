import styled from "styled-components";
import { spacingScale } from "../../../../../style/styleFunctions";
import { FONT_SIZE_SM } from "../../../../../style/styleVariables";

// base styles for key and value elements
export const SummaryBarCardKV = styled.dd`
  font-size: ${FONT_SIZE_SM};
  font-weight: 500;
  flex: 1 1;
  padding: ${spacingScale(0.25)};
`;

export default SummaryBarCardKV;
